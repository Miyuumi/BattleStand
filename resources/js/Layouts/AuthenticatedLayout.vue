<script setup>
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Link } from "@inertiajs/vue3";

const showingNavigationDropdown = ref(false);
const open = ref(null);
const employeeLibraries = ref([
    ["Employee", "mdi-account", "employees"],
    ["Designation", "mdi-account", "designations"],
]);

const EquipmentLibraries = ref([
    ["Equipments", "mdi-account", "equipments"],
    ["Facilities", "mdi-account", "facilities"],
]);
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100">
            <nav class="border-b border-gray-100 bg-white">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link :href="route('dashboard')">
                                    <img
                                        src="/images/logo.png"
                                        class="block h-[65px] w-auto"
                                        alt="Logo"
                                    />
                                </Link>
                            </div>
                            <div class="flex shrink-0 items-center">
                                eBarangay
                            </div>
                        </div>

                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <!-- Settings Dropdown -->
                            <div class="relative ms-3">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {{ $page.props.auth.user.name }}

                                                <svg
                                                    class="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownLink
                                            :href="route('profile.edit')"
                                        >
                                            Profile
                                        </DropdownLink>
                                        <DropdownLink
                                            :href="route('logout')"
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{
                        block: showingNavigationDropdown,
                        hidden: !showingNavigationDropdown,
                    }"
                    class="sm:hidden"
                >
                    <div class="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            :href="route('dashboard')"
                            :active="route().current('dashboard')"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="border-t border-gray-200 pb-1 pt-4">
                        <div class="px-4">
                            <div class="text-base font-medium text-gray-800">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="text-sm font-medium text-gray-500">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                :href="route('logout')"
                                method="post"
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex">
                <v-btn density="compact" icon="mdi-plus"></v-btn>

                <!-- Side Bar Navigation -->
                <aside
                    class="bg-white shadow h-screen w-[300px] fixed overflow-y-auto"
                >
                    <!-- <v-list v-model:opened="open">
                        <v-list-subheader>Home</v-list-subheader>
                        <v-list-item
                            title="Dashboard"
                            prepend-icon="mdi-view-dashboard"
                            :class="{
                                'hover:text-[#] hover:bg-gray-50': true,
                                'v-list-item--active':
                                    route().current('dashboard'),
                            }"
                            :style="
                                route().current('dashboard')
                                    ? {
                                          color: '#',
                                          backgroundColor: '#f0f0f0',
                                      }
                                    : {}
                            "
                            :active="route().current('dashboard')"
                            class="mx-2"
                            link
                            @click="$inertia.visit('/dashboard')"
                        ></v-list-item>

                        <v-list-subheader>Employee</v-list-subheader>

                        <v-list-group
                            value="Employees"
                            prepend-icon="mdi-account-group"
                            class="mx-2"
                        >
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    title="Employees"
                                ></v-list-item>
                            </template>

                            <template
                                v-for="(
                                    [title, icon, href], i
                                ) in employeeLibraries"
                                :key="i"
                            >
                                <v-list-item
                                    
                                    :title="title"
                                    :value="title"
                                    :class="{
                                        'hover:text-[#] hover:bg-gray-50': true,
                                        'v-list-item--active':
                                            route().current(href),
                                    }"
                                    :style="
                                        route().current(href)
                                            ? {
                                                  color: '#',
                                                  backgroundColor: '#f0f0f0',
                                              }
                                            : {}
                                    "
                                    :active="route().current(href)"
                                    link
                                    @click="$inertia.visit(href)"
                                ></v-list-item>
                            </template>
                        </v-list-group>

                        <v-list-subheader>Employee</v-list-subheader>

                        <v-list-group
                            value="Employees"
                            prepend-icon="mdi-account-group"
                            class="mx-2"
                        >
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    title="Employees"
                                ></v-list-item>
                            </template>

                            <template
                                v-for="(
                                    [title, icon, href], i
                                ) in employeeLibraries"
                                :key="i"
                            >
                                <v-list-item
                                    
                                    :title="title"
                                    :value="title"
                                    :class="{
                                        'hover:text-[#] hover:bg-gray-50': true,
                                        'v-list-item--active':
                                            route().current(href),
                                    }"
                                    :style="
                                        route().current(href)
                                            ? {
                                                  color: '#',
                                                  backgroundColor: '#f0f0f0',
                                              }
                                            : {}
                                    "
                                    :active="route().current(href)"
                                    link
                                    @click="$inertia.visit(href)"
                                ></v-list-item>
                            </template>
                        </v-list-group>
                    </v-list> -->

                    <aside
                        class="bg-white shadow h-screen w-[300px] fixed overflow-y-auto"
                    >
                        <v-list>
                            <v-list-subheader>Home</v-list-subheader>
                            <v-list-item
                                title="Dashboard"
                                prepend-icon="mdi-view-dashboard"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('dashboard'),
                                }"
                                :style="
                                    route().current('dashboard')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('dashboard')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/dashboard')"
                            ></v-list-item>

                            <v-list-subheader>Demograph</v-list-subheader>

                            <v-list-item
                                title="Households"
                                prepend-icon="mdi-home"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('households'),
                                }"
                                :style="
                                    route().current('households')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('households')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/households')"
                            ></v-list-item>
                            <v-list-item
                                title="Residents"
                                prepend-icon="mdi-account"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('residents'),
                                }"
                                :style="
                                    route().current('residents')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('residents')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/residents')"
                            ></v-list-item>

                            <v-list-subheader>Documents</v-list-subheader>

                            <v-list-item
                                title="Forms"
                                prepend-icon="mdi-file-multiple"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('documents'),
                                }"
                                :style="
                                    route().current('documents')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('documents')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/documents')"
                            ></v-list-item>
                            <v-list-item
                                title="Form Input"
                                prepend-icon="mdi-file-sign"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('inputs'),
                                }"
                                :style="
                                    route().current('inputs')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('inputs')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/inputs')"
                            ></v-list-item>
                            <v-list-item
                                title="Issuance"
                                prepend-icon="mdi-file-move"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('issuances'),
                                }"
                                :style="
                                    route().current('issuances')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('issuances')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/issuances')"
                            ></v-list-item>

                            <v-list-subheader
                                >Facilities & Equipments</v-list-subheader
                            >

                            <v-list-item
                                title="Facilities"
                                prepend-icon="mdi-office-building"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('facilities'),
                                }"
                                :style="
                                    route().current('facilities')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('facilities')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/facilities')"
                            ></v-list-item>
                            <v-list-item
                                title="Equipments"
                                prepend-icon="mdi-box-shadow"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('equipments'),
                                }"
                                :style="
                                    route().current('equipments')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('equipments')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/equipments')"
                            ></v-list-item>

                            <v-list-subheader>Peace and Order</v-list-subheader>

                            <v-list-item
                                title="Incidents"
                                prepend-icon="mdi-home-flood"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('incidents'),
                                }"
                                :style="
                                    route().current('incidents')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('incidents')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/incidents')"
                            ></v-list-item>

                            <v-list-item
                                title="Map"
                                prepend-icon="mdi-map-outline"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('incident_map'),
                                }"
                                :style="
                                    route().current('incident_map')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('incident_map')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/incident_map')"
                            ></v-list-item>

                            <v-list-subheader>Employee</v-list-subheader>

                            <v-list-item
                                title="Employees"
                                prepend-icon="mdi-account-group"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('employees'),
                                }"
                                :style="
                                    route().current('employees')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('employees')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/employees')"
                            ></v-list-item>
                            <v-list-item
                                title="Designations"
                                prepend-icon="mdi-briefcase"
                                :class="{
                                    'hover:text-[#] hover:bg-gray-50': true,
                                    'v-list-item--active':
                                        route().current('designations'),
                                }"
                                :style="
                                    route().current('designations')
                                        ? {
                                              color: '#',
                                              backgroundColor: '#f0f0f0',
                                          }
                                        : {}
                                "
                                :active="route().current('designations')"
                                class="mx-2"
                                link
                                @click="$inertia.visit('/designations')"
                            ></v-list-item>
                        </v-list>
                    </aside>
                </aside>

                <!-- Page Content -->
                <main class="flex-1 ml-[275px]">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
