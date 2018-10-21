<template>
    <div>
        You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </div>
</template>

<script>
    export default {
        name: 'Login',
        props: ['auth']
    };
</script>

<style scoped>

</style>
