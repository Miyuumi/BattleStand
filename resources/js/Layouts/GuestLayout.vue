<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center bg-gray-100 pt-16 sm:pt-0"
    >
        <!-- <div class="h-[250px] w-[250px] mt-16">
            <img
                src="/images/logo.png"
                alt="Logo"
                class="h-[250px] w-[250px] mt-16"
            />
        </div> -->

        <div style="font-size: 36px; font-weight: bold;" class="my-4">
            Battle Stand
        </div>
        <div
            class="w-full overflow-hidden bg-white px-6 py-4 shadow-md" style="max-width: 500px;"
        >
            <slot />
        </div>
    </div>
</template>
