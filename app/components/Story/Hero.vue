<template>
    <section class="mb-2 fade-in">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-gray-200 shadow-subtle mb-8">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span class="text-[11px] font-medium text-gray-600 tracking-tight">Catégorie : Aventure</span>
                </div>
                <h2 class="text-5xl sm:text-6xl font-semibold tracking-tighter text-gray-950 dark:text-white leading-[1.1] mb-6">
                    L'Héritage des Sables
                </h2>
                <p class="text-md text-gray-500 dark:text-slate-300 leading-relaxed max-w-md mb-8 line-clamp-4 lg:line-clamp-3 tracking-tight">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa distinctio saepe veniam vel similique aperiam veritatis, exercitationem, nostrum error, vitae dicta voluptate ipsum in animi aspernatur impedit! Sapiente, vero quisquam!
                </p>
                <div class="flex items-center gap-3 text-xs lg:text-sm">
                    <nuxt-link to="/books/book-uuid-1/chapter/chapter-uuid-1" class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-slate-800 dark:border-[1px] dark:border-gray-600">
                        <span class="md:hidden">Commencer</span>
                        <span class="hidden md:block">Commencer la lecture</span>
                        <Icon name="mdi:arrow-right" class="w-4 h-4" />
                    </nuxt-link>
                    <nuxt-link to="/books/book-uuid-1" class="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all">
                        <Icon name="mdi:book-multiple" class="w-4 h-4" />
                        3 Chapitre(s)
                    </nuxt-link>
                </div>
            </div>
            
            <!-- Hero Visual -->
            <div class="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-card">
                <div class="absolute inset-0 bg-gradient-to-tr from-gray-900/10 to-transparent z-10"></div>
                <img src="/assets/img2.jpg" class="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700" alt="Hero">
                <div class="absolute bottom-6 left-6 z-10">
                    <div class="bg-white/90 backdrop-blur border border-white/20 p-4 rounded-lg shadow-lg max-w-xs">
                        <p class="text-xs text-gray-500">Chapitre 3 disponible • Lu par 12k personnes</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>