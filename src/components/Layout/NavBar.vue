<template>
    <nav class="navbar is-success" aria-label="main navigation" role="navigation">

        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    Noteballs
                </div>

                <a
                  :class="{ 'is-active': showMobileNav }"
                  @click="showMobileNav = !showMobileNav"
                  class="navbar-burger"
                  aria-expanded="false"
                  aria-label="menu"
                  data-target="navbarBasicExample"
                  role="button"
                  ref="navBarBurger"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div
              :class="{ 'is-active': showMobileNav }"
              id="navbarBasicExample"
              class="navbar-menu"
              ref="navBarMenuRef"
            >

                <div class="navbar-start">
                   <button
                      v-if="storeAuth.user.id"
                      @click="logout"
                      class="button is-small is-info mt-3 ml-3"
                    >
                        Log out {{ storeAuth.user.email }}
                    </button>
                </div>

                <div class="navbar-end">
                   <RouterLink
                      @click="showMobileNav = false"
                      class="navbar-item"
                      active-class="is-active"
                      to="/"
                    >
                        Notes
                    </RouterLink>
                   <RouterLink
                     @click="showMobileNav = false"
                     class="navbar-item"
                     active-class="is-active"
                     to="/stats"
                   >
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>

/*
    imports
*/

import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/storeAuth';

/*
    store 
*/
const storeAuth = useStoreAuth();

/*
    mobile nav 
*/

const showMobileNav = ref(false)

/*
    click outside to close
*/

const navBarMenuRef = ref(null)
const navBarBurger = ref(null)

onClickOutside(navBarMenuRef, () =>{
    showMobileNav.value = false
},{
    ignore: [navBarBurger]
})


/*
    logout
*/

const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
}

</script>


<style>
@media(max-width: 1023px){
    .navbar-menu{
        position: absolute;
        left:0;
        width: 100%;
    }
}
</style>