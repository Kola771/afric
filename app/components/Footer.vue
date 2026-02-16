<script setup>
import { ref } from "vue"

const isOpen = ref(false)
</script>

<template>
   <!-- FOOTER -->
    <footer class="bg-[#fafafa] dark:bg-dark pt-16 lg:pt-12 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                <div class="col-span-2 lg:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white dark:border-gray-600 dark:border tracking-tighter p-1">
                          A
                        </div>
                        <span class="font-display font-bold text-slate-900 tracking-tight dark:text-white">Afric Storyline</span>
                    </div>
                    <p class="text-sm text-slate-500 max-w-xs mb-6 dark:text-slate-200">
                        La première plateforme digitale dédiée à la narration africaine contemporaine. Nous connectons les cultures par les mots.
                    </p>
                    <div class="flex gap-4">
                        <nuxt-link to="#" class="text-slate-800 hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors"><Icon name="mdi:twitter" class="w-5 h-5" /></nuxt-link>
                        <nuxt-link to="#" class="text-slate-800 hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors"><Icon name="mdi:instagram" class="w-5 h-5" /></nuxt-link>
                        <nuxt-link to="#" class="text-slate-800 hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors"><Icon name="mdi:linkedin" class="w-5 h-5" /></nuxt-link>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-slate-900 dark:text-white text-sm mb-4">Découvrir</h4>
                    <ul class="space-y-3 text-sm text-slate-500">
                        <li><nuxt-link to="/categories" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Catégories</nuxt-link></li>
                        <li><nuxt-link to="/stories" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Collections</nuxt-link></li>
                        <li><nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Recherche</nuxt-link></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold text-slate-900 dark:text-white text-sm mb-4">Créateurs</h4>
                    <ul class="space-y-3 text-sm text-slate-500">
                        <li><nuxt-link to="/authors" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Auteurs</nuxt-link></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold text-slate-900 dark:text-white text-sm mb-4">Entreprise</h4>
                    <ul class="space-y-3 text-sm text-slate-500">
                        <li><nuxt-link to="/about" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">À propos</nuxt-link></li>
                        <li><nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Mentions légales</nuxt-link></li>
                        <li><nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Politique de confidentialité</nuxt-link></li>
                        <li><nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 dark:text-slate-200 transition-colors">Contactez-nous</nuxt-link></li>
                    </ul>
                </div>
            </div>
            
            <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-xs text-slate-400 dark:text-slate-200">
                    © 2026 Afric Storyline Inc. Tous droits réservés.
                </div>
                <div class="flex gap-6 text-xs text-slate-500 dark:text-slate-200">
                    <nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 transition-colors">Confidentialité</nuxt-link>
                    <nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 transition-colors">Conditions</nuxt-link>
                    <nuxt-link to="#" class="hover:text-slate-900 dark:hover:text-slate-400 transition-colors">Cookies</nuxt-link>
                </div>
            </div>
        </div>
    </footer>
</template>
