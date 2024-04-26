<template>
    <div class="find-id-form">
        <div class="find-id-form-container">
            <div class="px-3 px-md-10 py-8 ">

                <div id="logo-image">
                    <v-avatar class="me-4" tile width="200" height="100">
                        <img src="~/assets/images/dsilLogoCut.jpg" alt="">
                    </v-avatar>
                </div>

                <br>
                <h3 class="mb-2 text-center">아이디 찾기</h3>
                <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">가입 시 입력했던 연락처를 입력해주세요.</h5>

                <v-divider></v-divider>

                <v-text-field outlined dense hide-details placeholder="010-1234-5678" class="mb-4"></v-text-field>

                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="text-capitalize font-600">
                            <span class="d-none d-sm-block">아이디(이메일) 찾기</span>
                        </v-btn>
                    </template>

                    <FindIdResultForm />
                </v-dialog>

            </div>
        </div>
    </div>
</template>

<script>
import FindIdResultForm from '@/components/memberManage/FindIdResultForm.vue';

export default {
    components:{
        FindIdResultForm,
    }
}
</script>

<style>
.find-id-form {
    width: 500px;
    height: 600px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    margin: 2rem auto;
    box-shadow: rgb(3 0 71 / 9%) 0px 8px 45px;

    @media(max-width: 500px) {
        width: 100%;
    }
}

.find-id-form-container {
    padding: 3rem 3.75rem 0px;

    @media(max-width: 500px) {
        padding: 3rem 1rem 0px;
    }
}

#logo-image {
    display: flex;
    justify-content: center;
    margin-left: 10px;
}
</style>