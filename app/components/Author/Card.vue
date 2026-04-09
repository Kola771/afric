<template>
  <article
    class="group border border-slate-200 rounded-2xl flex flex-col h-full bg-slate-50 dark:bg-slate-800 w-full mx-auto cursor-pointer">
    <div class="flex flex-col flex-1" @click="openTheAuthorDetail(props.author.uuid)">
      <div class="flex flex-col gap-4 lg:gap-3 rounded-t-2xl">
        <div
          class="relative flex-shrink-0 overflow-hidden rounded-t-2xl shadow-subtle group-hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5">
          <img v-if="props.author.photo" :src="props.author.photo.includes('https') ? props.author.photo : `${config.public.apiBackendUrl}/uploads/users/${props.author.photo}`"
            class="w-full h-28 md:h-36 lg:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
            :alt="props.author.name" />

          <span v-else
            class="p-1 text-md lg:text-2xl font-bold flex items-center justify-center w-full h-28 md:h-36 lg:h-40"
            :style="`background-color: ${props.author.code_color}`">
            {{
              props.author.name.split(" ").length > 1
                ? `${props.author.name.charAt(0).toUpperCase()}${props.author.name
                  .split(" ")[1]
                  ?.charAt(0)
                  .toUpperCase()}`
                : props.author.name.charAt(0).toUpperCase()
            }}
          </span>

          <div class="absolute top-2 left-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
            {{ index + 1 }}
          </div>

          <div
            class="absolute bottom-2 right-2 bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
            {{ props.author.rank }}
          </div>
        </div>

        <div class="flex flex-col gap-1 px-2">
          <div>
            <h3
              class="font-display font-medium text-slate-900 dark:text-slate-200 text-sm leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
              {{ props.author.name }}
            </h3>

            <p class="text-xs text-slate-500 dark:text-slate-200 font-medium">
              Originaire : {{ props.author.country.name }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-1 px-2 pb-2">
        <span class="text-[10px] flex gap-1">
          <span class="font-semibold text-slate-900 dark:text-slate-200">
            {{ formatNumber(props.author.total_followers) }}
          </span>
          <span class="text-slate-400">abonné(e)s</span>
        </span>

        <span class="w-px h-3 bg-slate-200"></span>

        <span class="text-[10px] flex gap-1">
          <span class="font-semibold text-slate-900 dark:text-slate-200">
            {{ formatNumber(props.author.books?.length || 0) }}
          </span>
          <span class="text-slate-400">livre(s)</span>
        </span>
      </div>
    </div>

    <div class="dark:border-t-[1px] p-2 dark:border-slate-300 w-full grid grid-cols-1 gap-2 text-[10px] font-semibold">
      <template v-if="user && Number(user.id) !== Number(author.id)">
        <button v-if="!follow || user && Number(user.id) !== Number(author.id)" :disabled="loading" @click.stop="followAuthor(props.author.id)"
          class="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded">
          Suivre
        </button>

        <button v-else :disabled="loading" @click.stop="unFollowAuthor(props.author.id)"
          class="bg-orange-700 hover:bg-orange-800 text-white p-2 rounded">
          Se désabonner
        </button>
      </template>
      <template v-else>
        <nuxt-link :to="`/authors/${author.uuid}`"
          class="bg-slate-600 hover:bg-slate-700 text-white p-2 text-center rounded">
          Voir {{user && Number(user.id) === Number(author.id) ? "mes" : "ses"}} informations
        </nuxt-link>
      </template>
    </div>
  </article>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const router = useRouter();
const { createFollower, deleteFollow } = useFollowers();

const props = defineProps<{
  index: number;
  user: User | null;
  author: Author;
}>();

const follow = ref<boolean | any>(false);
const loading = ref<boolean>(false);

const openTheAuthorDetail = (uuid: string) => {
  router.push(`/authors/${uuid}`);
};

onMounted(() => {
  if (!props.user) return;

  const result = props.author.followers?.some(
    (f: any) => f.follower_id === props.user?.id
  );

  follow.value = result;
});

const followAuthor = async (authorId: number) => {
  if (!props.user) {
    router.push("/login");
    return;
  }

  loading.value = true;

  try {
    await createFollower({
      follower: { id: props.user.id },
      following: { id: authorId },
    });

    follow.value = true;
  } finally {
    loading.value = false;
  }
};

const unFollowAuthor = async (authorId: number) => {
  if (!props.user) {
    router.push("/login");
    return;
  }

  loading.value = true;

  try {
    await deleteFollow(props.user.id, authorId);

    follow.value = false;
  } finally {
    loading.value = false;
  }
};
</script>