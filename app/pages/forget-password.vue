<template>
    <div class="">
        <div class="flex min-h-screen">
        
        <!-- LEFT COLUMN: Forgot Password Form -->
        <div class="flex dark:lg:border flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-dark z-10 relative">
            <div class="mx-auto w-full max-w-sm lg:w-[380px] py-8">
                
                <!-- Logo -->
                <div class="mb-10">
                    <nuxt-link to="/" class="flex items-center gap-2 group w-fit">
                        <div class="w-8 h-8 dark:border dark:border-slate-300 dark:bg-slate-800 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-95">
                            <Icon name="solar:book-2-bold" class="w-5 h-5" />
                        </div>
                        <span class="font-display font-medium text-slate-900 tracking-tight text-sm dark:text-white">Afric <span class="text-orange-600 dark:text-orange-500">Storyline</span></span>
                    </nuxt-link>
                </div>

                <!-- Content Wrapper -->
                <div id="form-container" v-if="step === 'email'" class="slide-up">
                    
                    <!-- Icon Header -->
                    <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100">
                        <Icon name="mdi:lock-outline" class="w-6 h-6 lg:w-5 lg:h-5" />
                    </div>

                    <!-- Header -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Mot de passe oublié ?</h2>
                        <p class="mt-2 text-sm text-slate-500 dark:text-slate-200 leading-relaxed">
                            Pas de panique. Entrez l'adresse email associée à votre compte et nous vous enverrons un code de validation.
                        </p>
                    </div>

                    <!-- Form Section -->
                    <form id="resetForm" class="space-y-6" @submit.prevent="sendEmail">
                        
                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-xs font-medium leading-6 text-slate-900 dark:text-white">Adresse email</label>
                            <div class="mt-1 relative group">
                                <input v-model="email" id="email" name="email" type="email" autocomplete="email" required 
                                    class="text-sm block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 outline-none dark:focus:ring-slate-500 focus:ring-orange-600 sm:text-sm sm:leading-6 transition-all dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200 pl-10 peer"
                                    placeholder="exemple@email.com">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 peer-focus:text-orange-600 transition-colors">
                                    <Icon name="mdi:email-outline" class="w-6 h-6 lg:w-5 lg:h-5" />
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button type="submit" class="dark:border flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all items-center gap-2 group">
                                Envoyer le code
                                <Icon name="mdi:send-outline" class="w-6 h-6 lg:w-5 lg:h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Success State (Hidden by default) -->
                <div v-if="step === 'code'" id="success-container" class="slide-up text-center">
                    <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-200 text-success-600 ring-1 ring-inset ring-green-100">
                        <Icon name="mdi:check" class="w-6 h-6 lg:w-5 lg:h-5" />
                    </div>
                    <h2 class="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Email envoyé !</h2>
                    <p class="mt-3 text-sm text-slate-500 leading-relaxed mb-8 dark:text-slate-200">
                        Si un compte est associé à <strong class="text-slate-900 dark:text-white">{{ email }}</strong>, 
                        un code de validation vous sera envoyé dans quelques instants.<br/>
                        Ce code est valable pendant 60 secondes.
                    </p>

                    <div class="flex justify-center gap-3 mb-2">
                        <input
                            v-for="(digit, index) in code"
                            :key="index"
                            :ref="(el) => inputs[index] = el as HTMLInputElement | null"
                            v-model="code[index]"
                            type="text"
                            maxlength="1"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            :class="`dark:border-slate-500 w-12 h-14 text-center text-lg font-semibold rounded-lg border border-slate-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-600 dark:focus:ring-slate-600 outline-none transition dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200`"
                            @input="handleInput(index)"
                            @keydown.backspace="handleBackspace(index)"
                        />
                    </div>
                    <button
                        @click="resendCode"
                        :disabled="countdown > 0"
                        class="font-medium transition-colors mb-4 text-sm dark:text-white"
                        :class="countdown > 0
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-orange-600 hover:text-orange-500'"
                    >
                        <span v-if="countdown > 0">
                            Renvoyer le code dans {{ countdown }}s
                        </span>
                        <span v-else>
                            Renvoyer le code
                        </span>
                    </button>

                    <button
                        @click="verifyCode"
                        :disabled="!isCodeComplete"
                        :class="[
                            'dark:border flex w-full justify-center rounded-lg px-3 py-2.5 text-sm font-semibold transition-all items-center gap-2',
                            isCodeComplete
                                ? 'bg-slate-900 text-white hover:bg-slate-800'
                                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-200 cursor-not-allowed'
                        ]"
                    >
                        Vérifier le code
                    </button>

                </div>

                <form v-if="step === 'password'" class="slide-up space-y-6" @submit.prevent="resetPassword">

                    <h2 class="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                        Nouveau mot de passe
                    </h2>

                    <!-- Mot de passe -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2 sm:col-span-1">
                            <label for="password" class="block text-xs font-medium text-slate-900 dark:text-white">
                                Mot de passe
                            </label>
                            <div class="mt-2 relative">
                                <input
                                    v-model="password"
                                    id="password"
                                    name="password"
                                    required
                                    type="password"
                                    autofocus="true"
                                    placeholder="**********"
                                    class="block w-full rounded-lg py-2.5 border border-slate-300 focus:ring-2 dark:focus:ring-slate-500 focus:ring-orange-600 outline-none text-sm pl-3 pr-10 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200"
                                />
                            </div>
                        </div>

                        <div class="col-span-2 sm:col-span-1">
                            <label for="confirmPassword" class="block text-xs font-medium text-slate-900 dark:text-white">
                                Confirmation
                            </label>
                            <div class="mt-2 relative">
                                <input
                                    v-model="confirmPassword"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="**********"
                                    class="block w-full rounded-lg py-2.5 border border-slate-300 focus:ring-2 dark:focus:ring-slate-500 focus:ring-orange-600 outline-none text-sm pl-3 pr-10 dark:bg-transparent dark:placeholder:text-slate-200 dark:text-slate-200"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Strength meter -->
                    <div class="space-y-2">
                        <div class="flex gap-1 h-1 w-full">
                            <div
                                v-for="(bar, i) in strengthClasses"
                                :key="i"
                                class="flex-1 rounded-full transition-colors duration-300"
                                :class="bar"
                            />
                        </div>

                        <p v-if="password && !hasMinLength"
                        class="text-xs font-medium text-red-600 mt-1">
                            Minimum 8 caractères
                        </p>

                        <p v-if="password && !hasUppercase"
                        class="text-xs font-medium text-red-600 mt-1">
                            Au moins une majuscule
                        </p>

                        <p v-if="isPasswordValid && isMatch === true"
                        class="text-xs font-medium text-green-600 mt-1">
                            Les mots de passe correspondent
                        </p>

                        <p v-else-if="isPasswordValid && isMatch === false"
                        class="text-xs font-medium text-red-600 mt-1">
                            Les mots de passe ne correspondent pas
                        </p>
                    </div>

                    <button
                        :disabled="submitDisabled"
                        class="w-full rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                        :class="submitDisabled
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800'"
                    >
                        Réinitialiser le mot de passe
                    </button>

                </form>


                <!-- Footer Back Link -->
                <div class="mt-10 pt-6 border-t-[1px] border-slate-200 flex justify-center">
                    <nuxt-link to="/login" class="dark:text-white flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group">
                        <Icon name="mdi:arrow-left" class="w-6 h-6 lg:w-5 lg:h-5" />
                        Retour à la connexion
                    </nuxt-link>
                </div>

            </div>
        </div>

            <div class="relative hidden w-0 flex-1 lg:block bg-slate-900">
                <img class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay" src="/assets/forget.avif" alt="Library Background">
            
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10"></div>
                <div class="absolute inset-0 flex flex-col justify-between p-12 text-white h-screen">
                    <div class="flex justify-end">
                        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide flex items-center gap-2 text-slate-200">
                            <div class="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                            Support disponible 24/7
                        </div>
                    </div>

                    <div class="max-w-md">
                        <div class="h-px w-12 bg-orange-500 mb-6 opacity-80"></div>
                        <blockquote class="text-2xl font-serif leading-snug text-slate-100 mb-6">
                            "Les paroles sont comme des œufs : éclos, ils ont des ailes"
                        </blockquote>
                        <div class="flex items-center gap-4">
                            <div class="h-10 w-10 rounded-full bg-orange-900/50 flex items-center justify-center text-orange-500 border border-orange-500/30">
                                <Icon name="mdi:book-open-page-variant" class="w-6 h-6 lg:w-5 lg:h-5" />
                            </div>
                            <div>
                                <div class="text-sm font-medium text-white">Proverbe Malgache</div>
                                <div class="text-xs text-slate-400">Sagesse ancestrale</div>
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

  useSeoMeta({
    title: 'Mot de passe oublié'
  });

const email = ref<string>('');
const message = ref<boolean>(false);
const countdown = ref<number>(60)
let timer: ReturnType<typeof setInterval> | null = null
const code = ref<string[]>(['', '', '', '', '', ''])
const inputs = ref<(HTMLInputElement | null)[]>([])
type Step = 'email' | 'code' | 'password'
const step = ref<Step>('email');
const password = ref<string>('')
const confirmPassword = ref<string>('')
const submitDisabled = ref<boolean>(true)
const hasMinLength = computed(() => password.value.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(password.value))

const startTimer = () => {
countdown.value = 60

timer = setInterval(() => {
    if (countdown.value > 0) {
        countdown.value--
    } else {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
    }
}, 1000)
}

watch(message, async (val) => {
    if (val) {
        await nextTick()
        inputs.value[0]?.focus()
        startTimer()
    }
})

const sendEmail = async () => {
    message.value = false;
    if(email.value.trim() !== '') {
        step.value = 'code'
        await sendCode();
        message.value = true;
        startTimer()
    }
}

const resendCode = async () => {
    await sendCode();
    startTimer();
}

const sendCode = async () => {
    console.log("Code envoyé");
}

const isCodeComplete = computed(() => {
    return code.value.every(digit => digit !== '')
})

const handleInput = (index: number) => {
    const current = code.value[index]

    if (current === undefined) return

    // garder uniquement les chiffres
    code.value[index] = current.replace(/[^0-9]/g, '')

    // focus suivant
    if (code.value[index] && index < code.value.length - 1) {
        inputs.value[index + 1]?.focus()
    }
}

const handleBackspace = (index: number) => {
    if (!code.value[index] && index > 0) {
        inputs.value[index - 1]?.focus()
    }
}

const verifyCode = () => {
    const finalCode = code.value.join('')
    console.log("Code saisi :", finalCode)

    if (finalCode.length === 6) {
        // Appel API ici
        console.log("Code valide, envoi au serveur");
        step.value = 'password';
    }
}

const isPasswordValid = computed(() => {
  return hasMinLength.value && hasUppercase.value
})

// ===== Password Strength =====
const strength = computed(() => {
  let score = 0

  if (hasMinLength.value) score++
  if (hasUppercase.value) score++
  if (/[0-9]/.test(password.value)) score++
  if (/[^A-Za-z0-9]/.test(password.value)) score++

  return score
})

const strengthClasses = computed(() => {
  if (strength.value === 0) return ['bg-slate-100','bg-slate-100','bg-slate-100','bg-slate-100']
  if (strength.value === 1) return ['bg-red-500','bg-slate-100','bg-slate-100','bg-slate-100']
  if (strength.value === 2) return ['bg-orange-500','bg-orange-500','bg-slate-100','bg-slate-100']
  if (strength.value === 3) return ['bg-orange-400','bg-orange-400','bg-orange-400','bg-slate-100']
  return ['bg-green-500','bg-green-500','bg-green-500','bg-green-500']
})

// ===== Password Match =====
const isMatch = computed(() => {
  if (!confirmPassword.value) return null
  return password.value === confirmPassword.value
})

const resetPassword = () => {
    console.log("Mot de passe réinitialisé");
    console.log("Email :", email.value);
    console.log("Code :", code.value.join(''));
    console.log("Mot de passe :", password.value);
    console.log("Confirmation :", confirmPassword.value);
}

watch([isMatch, isPasswordValid], () => {
  submitDisabled.value = !(isMatch.value === true && isPasswordValid.value)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
});
</script>