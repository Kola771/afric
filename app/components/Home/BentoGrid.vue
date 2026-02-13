<template>
    <div>
        <section class="bg-white dark:bg-dark py-14 md:pt-12 lg:pt-6 md:pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10 text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-display font-medium text-slate-900 dark:text-white tracking-tight">Collections Curatées</h2>
                    <p class="text-slate-500 mt-2 dark:text-slate-200">Des sélections faites main par nos éditeurs pour chaque humeur.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[500px]">
                    <!-- Large item -->
                    <div class="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=1000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-8">
                            <span class="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 block">Focus Éditorial</span>
                            <h3 class="text-white font-display font-medium text-3xl mb-2">Voix Féminines</h3>
                            <p class="text-slate-300 text-sm max-w-xs mb-4">Découvrez les nouvelles autrices qui redéfinissent la littérature contemporaine.</p>
                            <span class="inline-flex items-center text-white text-sm font-medium gap-1 group-hover:gap-2 transition-all">Explorer
                               <Icon name="mdi:arrow-right" class="w-5 h-5" /></span>
                        </div>
                    </div>

                    <!-- Top right -->
                    <div class="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                         <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                         <div class="absolute inset-0 flex items-center justify-center">
                             <h3 class="text-white font-display font-medium text-2xl tracking-tight">Afrofuturisme &amp; Tech</h3>
                         </div>
                    </div>

                    <!-- Bottom mid -->
                    <div class="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 bg-slate-100">
                         <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center group-hover:bg-slate-50 transition-colors">
                             <div class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                              <Icon name="mdi:heart" class="w-6 h-6" />
                             </div>
                             <h3 class="text-slate-900 font-display font-medium text-lg">Romance</h3>
                             <p class="text-slate-500 text-xs mt-1">120+ Histoires</p>
                         </div>
                    </div>

                    <!-- Bottom right -->
                    <div class="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 bg-slate-900 text-white">
                        <div class="absolute top-0 right-0 p-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none"></div>
                        <div class="absolute inset-0 flex flex-col justify-between p-6">
                            <Icon name="mdi:trophy-outline" class="w-6 h-6 text-orange-400" />
                            <div>
                                <h3 class="font-display font-medium text-lg mb-1">Les Classiques</h3>
                                <p class="text-slate-400 text-xs">Redécouvrez les légendes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>