<template>
  <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-24 pb-12 lg:pb-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <h1 class="text-2xl font-semibold mb-6 dark:text-slate-200">Mes notifications</h1>

      <!-- Aucune notification -->
      <div v-if="!loading && notifications.length === 0" class="text-center text-slate-500 text-sm dark:text-slate-400 flex flex-col items-center justify-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mb-2 text-slate-300 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-6a4 4 0 014-4h0a4 4 0 014 4v6m-4-4v4m0 0H9m4 0h4" />
        </svg>
        <p>Vous n'avez aucune notification pour le moment.</p>
      </div>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 5" :key="i" class="p-4 rounded-lg border border-white/20 dark:border-white/10 bg-white dark:bg-dark/60 animate-pulse flex gap-4 items-center">
          <div class="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Liste des notifications -->
      <div class="space-y-4" v-if="!loading && notifications.length > 0">
        <div v-for="(notif, index) in notifications" :key="index" @click="open(notif)"
          ref="el => cardRefs[index] = { cardRef: el }"
          class="p-4 rounded-lg shadow-sm border border-white/20 dark:border-white/10 transition hover:scale-[1.01] hover:shadow-md cursor-pointer"
          :class="!notif.is_read ? 'bg-slate-100 dark:bg-slate-800/80' : 'bg-white dark:bg-dark/60'">
          <div class="flex justify-between items-start">
            <div class="text-sm text-slate-800 dark:text-slate-100 flex items-start gap-2">
              <img :src="`${$config.public.apiBackendUrl}/uploads/books/${notif.book?.image}`"
                v-if="notif.book"
                class="w-12 h-12 object-cover transition-transform duration-500 rounded-lg"
                :alt="notif.book.title">
              <div>
                <h4 class="font-medium">{{ notif.chapter ? notif.chapter.title : notif.book.title }}</h4>
                <p class="text-slate-600 dark:text-slate-300 mt-1">{{ notif.message }}</p>
              </div>
            </div>
            <span class="text-xs text-slate-400 dark:text-slate-500">{{ formatLocalDate(notif.created_at) }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const { getProfile } = usersData();
const { getNotifications, updateData } = notificationsData();

const router = useRouter();
const user = ref<any>(null);
const notifications = ref<Notification[]>([]);
const loading = ref<boolean>(true);
const page = ref<number>(1);
const limit = ref<number>(25);
const totalPages = ref<number>(1);
const cardRefs = ref<any[]>([]);
const observer = ref<IntersectionObserver | null>(null);

const open = async (notif: Notification) => {
    await updateData(notif.id, notif.user.id, {is_read: true});
    if(notif.chapter) {
        router.push(`/books/${notif.chapter.book?.uuid}/chapter/${notif.chapter.uuid}`);
    } else {
        router.push(`/books/${notif.book?.uuid}`);
    }
}

// Load Notifications
const loadNotifications = async () => {
    if (!user.value) return;
    if (!loading.value) return;
    if (page.value > totalPages.value) return;

    loading.value = true;

    useSeoMeta({
        title: "Mes notifications"
    })

    try {
        const { data, totalPages: tp } = await getNotifications(page.value, limit.value, user.value.id);
        notifications.value.push(...data);
        totalPages.value = tp;
        page.value++;
        loading.value = false;
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
};

// Intersection Observer
const observeLastCard = () => {
    if (observer.value) observer.value.disconnect();

    nextTick(() => {
        const cards = cardRefs.value;
        if (!cards.length) return;

        const lastCard = cards[cards.length - 1]?.cardRef;
        if (!lastCard) return;

        observer.value = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    loadNotifications();
                }
            },
            { threshold: 0.8 }
        );

        observer.value.observe(lastCard);
    });
};

// Watch DOM rendering
watch(
    () => notifications.value.length,
    () => {
        observeLastCard();
    }
);

// Mounted
onMounted(async () => {
    user.value = await getProfile();
    if (!user.value) {
        router.push('/login');
        return;
    }
    const socket = useSocket(user.value.id);

    socket.off("notification"); // 🔥 évite les doublons

    socket.on("connect", () => {
        socket.emit("join", user.value!.id);
    });

    socket.on("notification", (data: Notification) => {
        notifications.value = data?.data;
        page.value = 1;
        // 👉 ici tu peux afficher toast / badge
    });
    await loadNotifications();
});

onUnmounted(() => {
    observer.value?.disconnect();
});
</script>