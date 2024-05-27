<template>
    <v-card>
        <div class="px-3 px-md-10 py-8 ">
            <h3 class="mb-2 text-center">회원 탈퇴</h3>
            <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">탈퇴 시 유의사항 안내</h5>
            <v-divider></v-divider>
            <br>

            <p class="text-14 mb-2 text-center">탈퇴 시 모든 정보가 사라지며, 되살릴 수 없습니다.</p>
            <v-card-text class="mb-4">
                1. 회원 탈퇴 시, 즉시 탈퇴 처리되며 서비스 이용이 불가합니다.<br>
                2. 할인쿠폰, 적립금, 이벤트, 기타 혜택은 모두 소멸되어 환불이 불가하며 재가입하더라도 복구되지 않습니다.<br>
                3. 기존 작성한 리뷰 및 댓글은 자동으로 삭제되지 않으며, 탈퇴 이후 회원 정보가 삭제되어 작성자 본인을 확인할 수 없으므로 리뷰 및 댓글의 삭제 요청도 처리할 수 없습니다.<br>
                4. 회원 정보는 회원 탈퇴 즉시 삭제됩니다. 다만, 부정 이용-거래 방지 및 전자상거래법 등 관련 법령에 따라 보관이 필요한 경우 해당 기간동안 회원 정보가 보관됩니다.
            </v-card-text>

            <div class="mb-4" id="check-read">
                <v-checkbox v-model="isChecked">
                    <template v-slot:label>
                        <div>
                            위 유의사항을 확인하였습니다.
                        </div>
                    </template>
                </v-checkbox>
            </div>

            <v-btn block color="rgb(255,84,82)" class="primary" @click="openModal" :disabled="!isChecked">
                <span class="d-none d-sm-block">회원탈퇴</span>
            </v-btn>

            <v-dialog v-model="dialog" width="500">
                <CheckUserDeleteForm :userInfo="userInfo" />
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import CheckUserDeleteForm from '@/components/memberManage/CheckUserDeleteForm.vue';

export default {
    components: {
        CheckUserDeleteForm,
    },
    props: {
        userInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            dialog: false,
            isChecked: false,
        }
    },
    methods: {
        openModal() {
            if (this.isChecked) {
                this.dialog = true;
            } else {
                alert('체크박스를 활성화 시켜주세요.');
            }
        },
    }
}
</script>

<style scoped></style>
