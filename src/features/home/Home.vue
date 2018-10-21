<template>
    <div v-if="loading" class="spinner-center">
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else>
        <md-card md-with-hover v-for="projct in projects">
            <md-card-header>
                <div class="md-title">{{projct.name}}</div>
            </md-card-header>

            <md-divider/>

            <md-card-content>
                <div class="row-wrapper">
                    <span class="label-wrapper">Klientas:</span>
                    <span>{{projct.stakeholder}}</span>
                </div>
                <div class="row-wrapper">
                    <span class="label-wrapper">Užbaigimo data:</span>
                    <span>{{formatDate(projct.endDate)}}</span>
                </div>
                <div class="row-wrapper">
                    <span class="label-wrapper">Valandos kaina: </span>
                    <span>{{projct.price}}</span>
                </div>
            </md-card-content>

            <md-divider/>

            <md-card-actions class="row-wrapper">
                <md-button @click="editProject(projct.id)" class="md-accent">Taisyti</md-button>
                <md-button @click="navigateToSheets(projct.id)" class="md-primary">Peržiūrėti laikus</md-button>
            </md-card-actions>
        </md-card>

        <md-button @click="addNewProject()" class="md-fab md-fab-bottom-right md-primary">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
    import format from 'date-fns/format';

    import http from '../../http/index';
    import router from '../../routes/index';
    import Automata from '../../core/fma';

    const STATES = {
        INITIAL: 'initial',
        FETCHING: 'fetching',
        SUCCESS: 'success',
        ERROR: 'error',
    };



    const vm = {
        name: 'home',
        props: ['auth', 'authenticated'],
        mounted: function () {
            this.fsa.transition('NEXT');
        },
        data() {
            const fsa = new Automata({
                initial: STATES.INITIAL,
                key: 'Dashboard',
                states: {
                    [STATES.INITIAL]: {
                        on: {
                            NEXT: STATES.FETCHING,
                        },
                    },
                    [STATES.FETCHING]: {
                        onEntry: [this.fetchData],
                        on: {
                            NEXT: STATES.SUCCESS,
                            ERROR: STATES.ERROR,
                        },
                    },
                    [STATES.SUCCESS]: {},
                    [STATES.ERROR]: {},
                },
            }) ;


            return {
                projects: [],
                fsa
            };
        },
        computed: {
            state: function () {
                return this.fsa.getCurrentState();
            },
            loading: function () {
                return this.fsa.getCurrentState() === STATES.FETCHING;
            }
        },
        methods: {
            formatDate(date) {
                return format(new Date(date), 'YYYY-MM-DD');
            },
            editProject(id) {
                router.push({
                    name: 'Timesheets',
                    params: { id: id }
                });
            },
            navigateToSheets(id) {
                router.push({
                    name: 'Timesheets',
                    params: { id: id }
                });
            },
            addNewProject() {
                router.push({ name: 'NewProject' });
            },
            fetchData() {
                return http.get('/api/projects')
                    .then(({ data }) => {
                        // console.table(data);

                        this.projects = data;
                        this.fsa.transition('NEXT');

                    })
                    .catch((err) => fsa.transition('ERROR'));

            }
        }
    };

    export default vm;
</script>

<style lang="scss" scoped>
    .spinner-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .label-wrapper {
        font-weight: bolder;
    }

    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>


