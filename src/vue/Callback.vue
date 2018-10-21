<template>
    <div class="spinner-center">
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>

<script>
    export default {
        name: 'callback',
        props: ['auth'],
        data() {
            this.auth.handleAuthentication();
            return {};
        }
    };
</script>

<style>
    .md-progress-spinner {
        margin: 24px;
    }

    .spinner-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
