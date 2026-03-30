<template>
    <div class="bg-[#fffcfccc] dark:bg-dark dark:border-b dark:border-slate-300 pt-24 pb-12 lg:pb-16 min-h-screen">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 class="text-2xl font-semibold mb-6 dark:text-slate-200">Mes notifications</h1>

            <!-- Aucune notification -->
            <div v-if="!loading && notifications.length === 0" class="text-center text-slate-500 dark:text-slate-400">
                Vous n'avez aucune notification pour le moment.
            </div>

            <!-- Liste des notifications -->
            <div class="space-y-4">
                <div v-for="(notif, index) in notifications" :key="index"
                    ref="el => cardRefs[index] = { cardRef: el }"
                    class="p-4 rounded-lg shadow-sm border border-white/20 dark:border-white/10 transition hover:scale-[1.01] hover:shadow-md cursor-pointer" :class="!notif.is_read ? 'bg-slate-100 dark:bg-slate-800/80' : 'bg-white dark:bg-dark/60'">
                    <div class="flex justify-between items-start">
                        <div class="text-sm text-slate-800 dark:text-slate-100">
                            <h4 class="font-medium">{{ notif.chapter ? notif.chapter.title : notif.book.title }}</h4>
                            <p class="text-slate-600 dark:text-slate-300 mt-1">{{ notif.message }}</p>
                        </div>
                        <span class="text-xs text-slate-400 dark:text-slate-500">{{ formatLocalDate(notif.created_at)
                            }}</span>
                    </div>
                </div>
            </div>

            <!-- LOADING -->
            <div v-if="loadingNotification" class="mt-6 text-center text-sm text-slate-500 dark:text-slate-200">
                Chargement...
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

const { getProfile } = usersData();
const { getNotifications } = notificationsData();

const router = useRouter();
const user = ref<any>(null);
const notifications = ref<Notification[]>([]);
const loading = ref<boolean>(false);
const loadingNotification = ref<boolean>(false);
const page = ref<number>(1);
const limit = ref<number>(25);
const totalPages = ref<number>(1);
const cardRefs = ref<any[]>([]);
const observer = ref<IntersectionObserver | null>(null);

// ============================
// Load Notifications
// ============================
const loadNotifications = async () => {
    if (!user.value) return;
    if (loading.value) return;
    if (page.value > totalPages.value) return;

    loading.value = true;
    loadingNotification.value = true;

    try {
        const { data, totalPages: tp } = await getNotifications(page.value, limit.value, user.value.id);
        notifications.value.push(...data);
        totalPages.value = tp;
        page.value++;
    } finally {
        loading.value = false;
        loadingNotification.value = false;
    }
};

// ============================
// Intersection Observer
// ============================
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

// ============================
// Watch DOM rendering
// ============================
watch(
    () => notifications.value.length,
    () => {
        observeLastCard();
    }
);

// ============================
// Mounted
// ============================
onMounted(async () => {
    user.value = await getProfile();
    if (!user.value) {
        router.push('/login');
        return;
    }
    const socket = useSocket(user.value.id);

    socket.off("notification"); // 🔥 évite les doublons

    socket.on("connect", () => {
        // console.log("🟢 socket connecté", socket.id);

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