<template>
    <div>
        <h3>Home</h3>
        <button @click="toUsers">Userのページに行く</button>
    </div>
</template>
<script>
export default {
    methods: {
        toUsers() {
            //this.$routerでrouterにアクセス
            this.$router.push('users');
            //これでも同じ
            //this.$router.push({ path: 'users'});
        }
    }
}
</script>