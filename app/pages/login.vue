<template>
     <div class="font-sans antialiased text-slate-800 selection:bg-orange-100 selection:text-orange-900">
        <div class="flex min-h-screen">
         
            <!-- LEFT COLUMN: Login Form -->
            <div class="flex dark:lg:border flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-dark z-10 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
         
                    <!-- Logo -->
                    <div class="mb-10">
                        <nuxt-link to="/" class="flex items-center gap-2 group w-fit">
                            <div class="w-8 h-8 dark:border dark:border-slate-300 dark:bg-slate-800 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-95">
                                <span class="font-display font-semibold text-lg tracking-tighter dark:text-white">A</span>
                            </div>
                            <span class="font-display font-medium text-slate-900 tracking-tight text-sm dark:text-white">Afric Storyline</span>
                        </nuxt-link>
                    </div>
                    <!-- Header -->
                    <div>
                        <h2 class="mt-6 text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Bon retour parmi nous</h2>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-200">
                            Vous n'avez pas de compte ?
                            <nuxt-link to="/register" class="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500 transition-colors hover:underline">S'inscrire gratuitement</nuxt-link>
                        </p>
                    </div>
                    <!-- Form Section -->
                    <div class="mt-8">
                        <!-- Social Login -->
                        <div class="grid grid-cols-2 gap-3">
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <img src="/assets/google.svg" alt="Google" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Google</span>
                            </button>
                            <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all">
                                <Icon name="mdi:apple" class="w-6 h-6 lg:w-5 lg:h-5" />
                                <span class="hidden sm:inline">Apple</span>
                            </button>
                        </div>
                        <div class="relative mt-6">
                            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                <div class="w-full border-t border-slate-100"></div>
                            </div>
                            <div class="relative flex justify-center text-xs font-medium leading-6">
                                <span class="bg-white dark:bg-dark px-4 text-slate-400">Ou continuer avec l'email</span>
                            </div>
                        </div>
                        <!-- Main Form -->
                        <form action="#" method="POST" class="mt-6 space-y-5">
                            <!-- Email Input -->
                            <div>
                                <label for="email" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Adresse email</label>
                                <div class="mt-1.5 relative">
                                    <input id="email" name="email" type="email" autocomplete="email" required
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3"
                                        placeholder="exemple@email.com">
                                </div>
                            </div>
                            <!-- Password Input -->
                            <div>
                                <label for="password" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Mot de passe</label>
                                <div class="mt-1.5 relative">
                                    <input id="password" name="password" type="password" autocomplete="current-password" placeholder="**********" required
                                        class="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm border-slate-300 border-[1px] placeholder:text-slate-400 focus:ring-2 outline-none dark:focus:ring-orange-500 focus:ring-orange-600 text-sm sm:leading-6 transition-all pl-3 pr-10">
                                    <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Icon name="mdi:eye" class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <!-- Remember & Forgot -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox"
                                        class="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-600 accent-orange-600 dark:border-slate-800 dark:text-orange-600">
                                    <label for="remember-me" class="ml-2 block text-xs text-slate-600 dark:text-white">Se souvenir de moi</label>
                                </div>
                                <div class="text-xs">
                                    <nuxt-link to="/forget-password" class="font-medium text-orange-600 hover:text-orange-500 hover:underline dark:text-orange-500">Mot de passe oublié ?</nuxt-link>
                                </div>
                            </div>
                            <!-- Submit Button -->
                            <div>
                                <button type="submit" class="dark:border flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all items-center gap-2 group">
                                    Se connecter
                                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- Footer Links -->
                    <div class="mt-10 border-t border-slate-100 pt-6">
                        <div class="flex justify-center gap-6 text-xs text-slate-400">
                            <nuxt-link to="#" class="hover:text-slate-600 transition-colors hover:underline">Conditions</nuxt-link>
                            <nuxt-link to="#" class="hover:text-slate-600 transition-colors hover:underline">Confidentialité</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- RIGHT COLUMN: Image & Branding -->
            <div class="relative hidden w-0 flex-1 lg:block bg-slate-900">
                <!-- Background Image -->
                <img class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay" src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop" alt="African Pattern Background">
         
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10"></div>
                <!-- Content overlay -->
                <div class="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    <div class="flex justify-end">
                        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Nouveautés disponibles
                        </div>
                    </div>
         
                    <div class="max-w-md">
                        <iconify-icon icon="solar:quote-up-bold" width="40" class="text-orange-500 mb-6 opacity-80"></iconify-icon>
                        <blockquote class="text-2xl font-serif leading-snug text-slate-100 mb-6">
                            "La littérature est la preuve la plus éclatante que la vie ne suffit pas."
                        </blockquote>
                        <div class="flex items-center gap-4">
                            <img src="/assets/fernando.webp" class="h-10 w-10 rounded-full border-2 border-orange-500/50" alt="Author">
                            <div>
                                <div class="text-sm font-medium text-white">Fernando Pessoa</div>
                                <div class="text-xs text-slate-400">Auteur & Critique Littéraire</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "not-layout",
});
</script>