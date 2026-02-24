<template>
    <div>
        <ProfilHero />
        <ProfilContent />
    </div>
</template>
<script lang="ts" setup>
const { toConnectUser } = authenticate();
const user = ref<User | null>(null);
const router = useRouter();

onMounted(async () => {
    user.value = await toConnectUser();
    if(!user.value) {
        router.push("/login");
    } else {
        useSeoMeta({
            title: `Profil - ${user.value.name}`,
        });
    }
})
</script>