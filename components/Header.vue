<template>
  <div class="w-full h-[10vh] flex justify-between items-center">
    <h1 class="text-xl font-bold"><a href="/">REMINDWORDS</a></h1>

    <nav
      class="flex rounded-md overflow-hidden [&>a]:font-medium [&>a]:py-1 [&>a]:px-5 [&>a:hover]:bg-[#ffc6ea] text-[#676767] [&>a]:transition [&>a]:duration-300">
      <NuxtLink to="/" exact-active-class="text-black">Home</NuxtLink>
      <NuxtLink to="/dailyword" exact-active-class="text-black">Daily word</NuxtLink>
      <NuxtLink to="/addwords" exact-active-class="text-black">Add words</NuxtLink>
    </nav>

    <a href="/login" class="bg-black font-medium text-white px-4 py-1 rounded-md">Login</a>
  </div>
</template>

<script>
export default {

}
</script>