<!--suppress ALL -->
<template>
    <div class="page-container full-height">
        <md-app class="full-height">
            <md-app-toolbar class="md-primary flex">
                <span class="md-title">Projektų laiko stebėjimo sistema</span>
                <md-button v-if="authenticated" @click="logout">Atsijungti</md-button>
            </md-app-toolbar>
            <md-app-content class="md-elevation-3">
                <router-view
                    :auth="auth"
                    :authenticated="authenticated">
                </router-view>
            </md-app-content>
        </md-app>
    </div>
</template>

<style scoped>
    .flex {
        display: flex;
        justify-content: space-between;
    }

    .full-height {
        height: 100%;
    }
</style>

<script>
    import auth from '../auth/AuthService';
    import router from '../routes';

    const { authenticated, authNotifier, logout } = auth;

    export default {
        name: 'app',
        data() {
            authNotifier.on('authChange', authState => {
                this.authenticated = authState.authenticated;
            });

            return {
                auth,
                authenticated
            };
        },
        methods: {
            logout
        }
    };
</script>



