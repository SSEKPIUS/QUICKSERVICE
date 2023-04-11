<template>
  <nav class="side-menu shadow-lg bg-gray-700 h-full" @mouseover="mouse_leave = false" @mouseleave="mouse_leave = true">
    <ul class="menu-list-group">
      <li class="menu-item" :class="{'active':current_route=='/accounts'}">
        <nuxt-link to="/accounts">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Dashboard</span>
          </span>
        </nuxt-link>
      </li>
    </ul>

    <ul class="menu-list-group">
      <li class="menu-item" :class="{'active':current_route=='/accounts/invoices'}">
        <nuxt-link to="/accounts/invoices">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Invoices</span>
          </span>
        </nuxt-link>
      </li>
      <li class="menu-item" :class="{'active':current_route=='/accounts/orders'}">
        <nuxt-link to="/accounts/orders">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Orders</span>
          </span>
        </nuxt-link>
      </li>
    </ul>

    <ul class="menu-list-group">
      <li class="menu-item" :class="{'active':current_route=='/accounts/rooms'}">
        <nuxt-link to="/accounts/rooms">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Hotel Rooms</span>
          </span>
        </nuxt-link>
      </li>
      <li class="menu-item" :class="{'active':current_route=='/accounts/sauna'}">
        <nuxt-link to="/accounts/sauna">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Sauna Massage</span>
          </span>
        </nuxt-link>
      </li>
    </ul>

    <ul class="menu-list-group">
      <li class="menu-item" :class="{'active':current_route=='/accounts/inventory'}">
        <nuxt-link to="/accounts/inventory">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Inventory</span>
          </span>
        </nuxt-link>
      </li>
      <li class="menu-item" :class="{'active':current_route=='/accounts/inventorylogs'}">
        <nuxt-link to="/accounts/inventorylogs">
          <span class=" flex flex-row whitespace-nowrap justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="mouse_leave ? 'menu-icons-wide' : 'menu-icons-small'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span class=" menu-text" :class="{'hidden':mouse_leave}">Inventory Logs</span>
          </span>
          <span class="fe fe-shield" />
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      mouse_leave: true
    }
  },
  computed: {
    current_route () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.side-menu{
    min-height: calc(100vh - 140px);
    width: auto;
    @apply border-gray-400 py-4 px-5;
}

 .menu-list-group :first-child{
    @apply mt-0;
 }

 .menu-list-group{
    @apply text-gray-800 mt-8;
 }

.menu-list-group .menu-item{
     @apply mt-0 outline-none;
}

.menu-list-group .menu-item .fe{
     @apply mr-1 text-gray-700;
}

.menu-list-group .menu-item a{
     transition: all .3s;
     @apply block w-full text-base text-white py-2;
}

.menu-list-group .menu-item a:mouse_leave{
     @apply text-yellow-500 pl-1;
}

.menu-list-group .active a {
     @apply text-yellow-500;
}

.menu-list-group .menu-item a.nuxt-link-active{
     @apply font-semibold;
}
/*menu-text*/
.menu-text{
  font-size: 1em;
}
.hide-text .menu-text{
  display: none;
}
.menu-icons-wide{
  @apply h-8 w-8 mr-2;
}
.menu-icons-small{
  @apply h-6 w-6 mr-2;
}

</style>
