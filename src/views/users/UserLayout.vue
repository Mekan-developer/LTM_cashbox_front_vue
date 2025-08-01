<template>
    <div class="flex flex-col h-full ">
        <div class="flex flex-row justify-start text-2xl font-semibold items-center h-[30px]  border-b-2 border-b-gray-300">
            <div class="flex items-center h-full text-center cursor-pointer" >
                <router-link to="/user" exact-active-class="text-green-900 bg-blue-100" class="px-4 py-1 rounded-t-[8px] transition-all duration-400">Profile</router-link>
            </div>
            <div class="flex items-center h-full cursor-pointer ">
                <router-link to="/user/list" exact-active-class="text-green-900 bg-blue-100" class="px-4 py-1 rounded-t-[8px] transform transition-all duration-400">Users</router-link>
            </div>
        </div>
        <div class="flex-1 bg-blue-200 rounded-b-[8px]">
             <router-view />
        </div>
    </div>   
</template>

<script>

</script>
