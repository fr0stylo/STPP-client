<template>
    <H3>asfgas</H3>
</template>

<script>
    import http from '../http';


    export default {
        name: 'Timesheets',
        data() {
            return {
                loading: true,
                timeEntries: []
            }
        },
        mounted: function() {
            console.log(this.$route.params);

            return http.get(`/api/projects/${this.$route.params.id}`)
                .then(({data}) => {
                    this.timeEntries = data;
                    this.loading = false;
                });
        }
    };
</script>

<style scoped>

</style>
