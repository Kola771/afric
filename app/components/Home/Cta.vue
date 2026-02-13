<template>
    <div class="">
        <div class="bg-lightOrange dark:bg-slate-800">
            <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:pb-16 text-center">
                <h2 class="text-3xl md:text-4xl dark:text-white font-display font-semibold text-slate-900 tracking-tight mb-4">
                    Prêt à commencer l'aventure ?
                </h2>
                <p class="text-slate-500 dark:text-slate-200 text-lg mb-8 max-w-lg mx-auto">
                    Rejoignez une communauté de passionnés. Lisez, commentez et échangez avec vos auteurs préférés.
                </p>
        
                <!-- Email Input -->
                <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="mdi:email-outline" class="w-5 h-5 dark:text-slate-600" />
                        </div>
                        <input type="email" class="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm transition-all shadow-sm" placeholder="Votre adresse email">
                    </div>
                    <button type="button" class="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl text-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg shadow-slate-200/50 dark:hover:bg-dark dark:border-slate-400 dark:border-[1px] dark:shadow-slate-700 whitespace-nowrap transition-all">
                        Créer mon compte
                    </button>
                </form>
                <p class="text-xs text-slate-400 dark:text-slate-200 mt-4">14 jours pour te faire chavirer.</p>
            </section>
        </div><div class="wave-divider bg-lightOrange dark:bg-slate-800"><svg class="fill-[#fafafa] dark:fill-dark" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"></path></svg></div>
    </div>
</template>