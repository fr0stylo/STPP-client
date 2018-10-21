<template>
    <md-card>
        <form @submit="submit">
            <div class="md-title">Projekto kurimas</div>
            <md-divider/>
            <div class="md-layout md-gutter after-divider">
                <div class="md-layout-item md-size-15"></div>

                <tl-input label="Pavadinimas" v-model="name" v-bind:validate="nameValidation"/>

                <tl-input label="Užsakovas" v-model="stakeholder" v-bind:validate="stakeholderValidation"/>

                <div class="md-layout-item md-size-15"></div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-15"></div>

                <tl-input label="Biudžetas" v-model="budget" dollarSign="true" v-bind:validate="budgetValidation"/>

                <tl-input label="Kaina" v-model="price" dollarSign="true" v-bind:validate="priceValidation"/>

                <div class="md-layout-item md-size-15"></div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-15"></div>

                <div class="md-layout-item">
                    <div class="datepicker-wrapper">
                        <md-datepicker v-model="startDate" md-immediately>
                            <label>Pradžios data</label>
                        </md-datepicker>
                    </div>
                </div>

                <div class="md-layout-item">
                    <div class="datepicker-wrapper">
                        <md-datepicker v-model="endDate" v-bind:md-disabled-dates="disableDates" place md-immediately>
                            <label>Pabaigos data</label>
                        </md-datepicker>
                    </div>
                </div>

                <div class="md-layout-item md-size-15"></div>
            </div>
            <md-divider class="after-divider"/>
            <div class="footer-wrapper">
                <md-button class="md-accent" to="/projects">Grįžti</md-button>
                <md-button type="submit" class="md-primary">Išsaugoti</md-button>
            </div>
        </form>
    </md-card>
</template>

<script>
    import isBefore from 'date-fns/is_before';

    import http from '../../http/index';
    import Input from './components/Input';


    export default {
        name: 'ProjectForm',
        components: { Input },
        data() {

            return {
                name: '',
                price: '',
                budget: '',
                stakeholder: '',
                startDate: new Date(),
                endDate: new Date(),
            };
        },
        methods: {
            submit: function (e) {
                e.preventDefault();
                let errors;
                errors = this.priceValidation(this.price);
                errors = this.budgetValidation(this.budget);
                errors = this.nameValidation(this.name);
                errors = this.stakeholderValidation(this.stakeholder);

                if (!errors) {
                    return http.post('/api/projects', {
                        price: this.price,
                        stakeholder: this.stakeholder,
                        name: this.name,
                        budget: this.budget,
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                        .then(() => this.$router.push({ name: 'Home' }));
                }
            },
            priceValidation: function (value) {
                if (!/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/.test(value)) {
                    return 'Kaina turi būti teigiamas skaičius';
                }
            },
            budgetValidation: function (value) {
                if (!/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/.test(value)) {
                    return 'Budžetas buti buti teigiamas skaičius';
                }
            },
            nameValidation: function (value) {
                if (!value.length) {
                    return 'Įveskite pavadinima';
                }
            },
            stakeholderValidation: function (value) {
                if (!value.length) {
                    return 'Įvesite užsakovą';
                }
            },
            disableDates: function (val) {
                return isBefore(val, new Date());
            }
        }
    };
</script>

<style scoped>
    .md-title {
        padding: 20px 20px 20px 30px;
    }

    .datepicker-wrapper {
        max-width: 100%;
    }

    .after-divider {
        margin-top: 20px;
    }

    @media only screen and (max-width: 930px) {
        /* For mobile phones: */
        [class*="datepicker-wrapper"] {
            max-width: 249px;
        }
    }

    .footer-wrapper {
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
</style>
