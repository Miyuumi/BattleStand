<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    username: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route('login'));
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <div>
            <form @submit.prevent="submit">
                <div>
                    <v-text-field
                        label="Username"
                        id="username"
                        type="username"
                        class="mt-1 block w-full"
                        v-model="form.username"
                        required
                        autofocus
                        autocomplete="username"
                    />
                </div>

                <div class="mt-4">
                    <v-text-field
                        label="Password"
                        id="password"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                    />
                </div>

                <div class="mt-4 flex items-center justify-end">

                    <v-btn
                        class="ms-4"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        type="submit"
                    >
                        Log in
                    </v-btn>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
