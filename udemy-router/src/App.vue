<template>
  <div>
    <nav>
      <!--以下でもアクセスできるが、画面遷移する度に通信が行われてしまう
      <a href ="/">Hoem</a>
      <a href ="/users">Users</a>
      -->
      <router-link to="/">Hoem</router-link>
      <router-link to="/users">Users</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

