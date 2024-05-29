<template>
  <v-col cols="4" sm="6" md="4">
    <!-- 예약 날짜, 시간 선택하는 모달창 -->
    <v-dialog ref="dialog" v-model="modal" persistent width="330px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">예약 날짜 및 시간 선택</v-btn>
      </template>
      <v-card>
        <!-- 예약 날짜 선택 -->
        <v-date-picker v-model="date" :min="minDate" scrollable locale="ko" full-width></v-date-picker>
        <p style="margin-left: 10px;">예약 시간을 선택해주세요.<span class="time-description"></span></p>
        <!-- 시간 선택 버튼 -->
        <div class="time-buttons-container" @touchmove.prevent="handleTouchMove">
          <v-row class="time-buttons" justify="center">
            <v-btn v-for="(time, index) in timeOptions" :key="index" @click="selectTime(index)"
              :class="['time-button', isSelected(time) ? 'selected' : '', isDisabled(time) ? 'disabled' : '']"
              :disabled="isDisabled(time)" :style="{ width: '80px' }">
              {{ time }}
            </v-btn>
          </v-row>
        </div>
        <!-- 인원 수 입력 -->
        <v-text-field v-model="numberOfPeople" label="인원 수" type="number" style="margin-left: 10px;"></v-text-field>
        <!-- 예약하기 및 닫기 버튼 -->
        <v-card-actions>
          <v-btn color="primary" text @click="set" :disabled="numberOfPeople <= 0">예약하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click=cancelReservation()>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- 예약 확인 모달 -->
    <!-- 예약금이 있는 경우 확인 모달 -->
    <v-dialog v-if="depositAmount" v-model="showConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">아래 일정대로 예약하시겠습니까?</p>
          <v-card-text style="text-align: center;">
            <p><strong>예약정보</strong></p>
          </v-card-text>
          <div class="confirmation-content" style="margin-top: -10px;">
            <p>{{ selectedDateTime }}시 {{ numberOfPeople }}명</p>
            <p>예약금 <span style="margin-left: 88px;">{{ calculateDeposit }}원</span></p>
            <p style="font-size: 0.8rem; opacity: 0.6;">(결제하기 버튼을 7분 이내로 눌러주세요.)</p>
            <p style="font-size: 0.8rem; opacity: 0.6; color:red">(예약 취소 시, 예약금은 환불 정책에 따라 반환됩니다.)</p>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); margin-left:45px; color: white"
            @click="confirmReservation2">결제하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="background-color: #E0E0E0; margin-right:45px;" text @click=cancelReservation()>취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 예약금이 없는 경우 확인 모달 -->
    <v-dialog v-if="!depositAmount" v-model="showConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">아래 일정대로 예약하시겠습니까?</p>
          <v-card-text style="text-align: center;">
            <p><strong>예약정보</strong></p>
          </v-card-text>
          <div class="confirmation-content" style="margin-top: -10px;">
            <p>{{ selectedDateTime }}시 {{ numberOfPeople }}명</p>
            <p style="font-size: 0.8rem; opacity: 0.6;">(예약하기 버튼을 7분 이내로 눌러주세요.)</p>
            <p style="font-size: 0.8rem; opacity: 0.6;">당일취소 및 노쇼는 다른 사람에게 피해를 줄 수 있으므로<br> 신중하게 예약해주시기 바랍니다.</p>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); margin-left:45px; color: white"
            @click="confirmReservation">예약하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="background-color: #E0E0E0; margin-right:45px;" text @click=cancelReservation()>취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 예약금 없는 예약 확정 모달 -->
    <v-dialog v-if="!depositAmount" v-model="showReservationConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">예약이 확정되었습니다!</p>
          <p>4초 후에 자동으로 창이 닫힙니다.</p>
          <p>밥알 {{ riceBallPoints }}개 적립완료 (현재 누적 밥알 {{ totalRiceBallPoints + 100 }}개)</p>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); color: white"
            @click="showReservationConfirmationModal = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 결제 모달 -->
    <v-dialog v-if="showPaymentModal" v-model="showPaymentModal" persistent width="550px">
      <v-card class="custom-card">
        <v-card-title class="title">
          <p style="margin-top: 2px;">예약금 결제</p>
          <v-icon @click="cancelPayment" style="position: absolute; right: 9px; top: 20px;">mdi-close</v-icon>
        </v-card-title>
        <v-card-title class="restaurant-name" style="margin-bottom: 13px;">
          <div style="margin-top: -20px;">{{ restaurantName }}</div>
        </v-card-title>

        <!-- 타이머 표시 -->
        <v-card-text style="display: inline-block;">
          <div style="background-color: #B0E2FF; padding: 2px; border-radius: 5px; display: inline-block;">
            <span style="color: #1E90FF; font-weight: bold; padding-left: 5px;">{{ timer }}</span>
            <!-- "새로고침" 버튼 추가 -->
            <v-btn icon @click="resetTimer" style="min-width: auto; margin-left: -3px;">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
          <span> 7분간 예약 찜! 시간 내 예약을 완료해주세요.</span>
        </v-card-text>

        <!-- 예약 정보 및 밥알 사용 -->
        <v-card-text style="margin-top: 3px;">
          <div
            style="background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; text-align: center;">
            <div style="text-align: left;">
              <p style="font-weight: bold; margin-bottom: 5px;">예약 정보</p>
              <p class="reservation-details" style="margin-top: 0; margin-bottom: 3px;">{{ selectedDateTime }}시 {{
      numberOfPeople }}명</p>
            </div>
            <!-- 다른 사람이 방문해요 버튼 -->
            <v-btn color="white" style="border-radius: 15px; display: block; margin: 0 auto;"
              @click="openVisitorModal">다른
              사람이 방문해요</v-btn>
            <div style="margin-top: 10px;">
              <!-- 방문자 정보 표시 -->
              <!-- 데이터가 있을 때만 표시하도록 설정합니다. -->
              <p v-if="visitorName">방문자 성함 : {{ visitorName }}</p>
              <p v-if="visitorContact">방문자 연락처 : {{ visitorContact }}</p>
            </div>
          </div>
          <p style="margin-top: 10px; font-weight: bold;margin-bottom: 10px;  margin-left: 6px;">드실 포인트</p>
          <div
            style="background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 5px;">
            <p style="font-weight: bold;">
              현재 보유 밥알: {{ totalRiceBallPoints }} 밥알<br>
              몇 밥알? : <input type="number" v-model="riceBallInput" @input="handleInputChange"
                placeholder="사용할 밥알을 입력해주세요." pattern="[0-9]*">
            </p>
            <br>
            <span style="font-weight: bold; color: black;">레스토랑 유의사항</span><br>
            <input type="checkbox" id="reservationPolicy" v-model="reservationPolicyAgreed">
            <label for="reservationPolicy">[필수] 예약금은 식당에서의 최종 결제 금액에서 차감됩니다.</label>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <div
          style="background-color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 91.5%; margin: 20px auto;">
          <span style="font-weight: bold; color: black; margin-top: 20px;">고객 요청 사항</span>
          <div
            style="background-color:rgba(251, 251, 251, 0.89);; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px;">
            <textarea v-model="customerRequest" rows="4" cols="50"
              style="resize: none; border: none; background-color: transparent;"
              placeholder="레스토랑에 요쳥하실 내용을 입력해주세요."></textarea>
          </div>
        </div>

        <div
          style="background-color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 91.5%; margin: 20px auto;">
          <span style="font-weight: bold; color: black;">주문 내용 확인 및 결제 동의</span>
          <br>
          <input type="checkbox" id="agreeTerms" v-model="agreeTerms" required>
          <label for="agreeTerms"> [필수] 취소 및 환불 규정에 동의합니다</label>
          <div
            style="background-color:rgba(251, 251, 251, 0.89);; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px;">
            <textarea readonly rows="4" cols="50" style="resize: none; border: none; background-color: transparent;">
          2일전 취소 : 100% 환불
          1일전 취소 : 50% 환불
          당일 취소 : 환불 불가
          노쇼 시 : 환불 불가
        </textarea>
          </div>
        </div>

        <div
          style="background-color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 91.5%; margin: 20px auto;">
          <span style="font-weight: bold; color: black; margin-top: 20px;">개인정보 제 3자 제공 동의</span>

          <!-- 개인 정보 제공 동의문 모달 버튼 -->
          <v-btn @click="showPrivacyModal" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>

          <div style="font-size: 11px; color: grey; margin-top: 10px;">(주)드실은 통신판매중개자이며 통신판매의 당사자가 아닙니다.</div>
          <div style="font-size: 11px; color: grey;">(주)드실은 예약 및 구매관련 통신판매업자가 제공하는 상품, 거래정보 및 거래 등에 대하여 책임을 지지 않습니다.
          </div>
        </div>

        <v-dialog v-model="privacyModal" max-width="600">
          <v-card>
            <v-card-title>개인정보 처리방침</v-card-title>
            <v-card-text>
              <!-- 여기에 동의서 내용을 넣으세요 -->
              <p>주식회사 드실(이하 "회사"라 한다)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고
                원활하게
                처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립합니다.<br>
                개인정보처리방침은 이용자가 언제나 쉽게 열람할 수 있도록 서비스 초기화면을 통해 공개하고 있으며 관련법령, 지침, 고시 또는 캐치테이블 서비스 정책의 변경에 따라 달라질 수 있습니다.
              </p>
              <br>
              <p style="color: black; font-size: 16px;"><b>1. 개인정보의 수집·이용</b></p>
              <p>회사는 다음과 같이 이용자의 개인정보를 수집합니다. 처리하고 있는 개인정보는 다음의 수집·이용 목적 이외의 용도로는 활용되지 않으며, 수집·이용 목적이 변경되는 경우에는 개인정보보호법에
                따라
                별도의 동의를 받는 등 필요한 조치를 이행합니다.</p><br>
              <p>1) 회원 정보의 수집·이용목적, 수집항목, 보유·이용기간은 아래와 같습니다.</p><br>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">구분</th>
                    <th style="border: 1px solid black;">수집·이용 목적</th>
                    <th style="border: 1px solid black;">수집 항목</th>
                    <th style="border: 1px solid black;">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">회원관리</td>
                    <td style="border: 1px solid black;">회원 식별, 회원제 서비스 제공, 상담 관리, 휴대전화번호 인증</td>
                    <td style="border: 1px solid black;">닉네임, 이름, 휴대전화 번호, 생년월일, 성별, (선택)프로필이미지</td>
                    <td style="border: 1px solid black;">목적달성(회원 탈퇴 등) 후 지체없이 파기 (단, 관련법령 및 회사정책에 따라 별도 보관되는 정보는 예외)
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">타사 계정 이용</td>
                    <td style="border: 1px solid black;">회원 식별, 회원제 서비스 제공, 상담 관리, 휴대전화번호 인증</td>
                    <td style="border: 1px solid black;">휴대전화번호, 닉네임, 이름, 생년월일, (선택)프로필이미지 <br> *수집하는 개인정보 : 휴대전화번호,
                      닉네임,
                      이름, 생년월일, (선택)프로필이미지 <br> *회사가 제3자로부터 제공받은 개인정보: 카카오 ID, 이름, (선택)성별, 연령대, 생일, 출생연도; 네이버 ID, 이름,
                      별명,
                      휴대전화번호, (선택)성별, 연령대, 생일, 출생연도, 이메일주소; Apple ID, 이메일주소, Apple ID 코드; 페이스북, 사용자 ID</td>
                    <td style="border: 1px solid black;">목적달성(회원 탈퇴 등) 후 지체없이 파기 (단, 관련법령 및 회사정책에 따라 별도 보관되는 정보는 예외)
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">서비스 이용</td>
                    <td style="border: 1px solid black;">결제 카드 등록 및 관리, 결제 처리, 본인 명의 결제수단 인증, 부정 사용자 차단 및 관리</td>
                    <td style="border: 1px solid black;">카드정보 : 카드번호, 카드 비밀번호 앞2자리, 유효기간(월/년도) <br> 본인인증 정보 : CI,
                      휴대전화번호,
                      생년월일, 성별, 이름, 내/외국인여부</td>
                    <td style="border: 1px solid black;">서비스 해지시까지</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">서비스 진행상황 안내, 계약 이행 및 약관 변경 등의 고지</td>
                    <td style="border: 1px solid black;">휴대전화번호, 이메일주소</td>
                    <td style="border: 1px solid black;">목적달성(회원탈퇴등)후 지체없이 파기</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">(휴대전화 본인인증) 서비스 제공을 위한 이용자 식별, 본인인증</td>
                    <td style="border: 1px solid black;">회사가 제3자로부터 제공받은 개인정보: 휴대전화번호, CI, DI, 생년월일, 성별, 내/외국인여부</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">회원관리, 불법 및 부정이용 방지, 서비스 이용 기록의 통계 및 분석, 서비스 개선, 신규 서비스 개발</td>
                    <td style="border: 1px solid black;">수집한 모든 개인정보 항목, 자동 수집 정보</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">문의</td>
                    <td style="border: 1px solid black;">회원상담, 제휴상담</td>
                    <td style="border: 1px solid black;">이메일주소, 휴대전화번호, 이름</td>
                    <td style="border: 1px solid black;">전자 상거래 등에서의 소비자 보호에 대한 법률에 따라 3년간 보관</td>
                  </tr>
                </tbody>
              </table><br>
              <p>2) 이용자 정보의 수집·이용목적, 수집항목, 보유 이용기간은 아래와 같습니다.</p>


              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">구분</th>
                    <th style="border: 1px solid black;">수집·이용 목적</th>
                    <th style="border: 1px solid black;">수집 항목</th>
                    <th style="border: 1px solid black;">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">선택적 서비스 이용 [캐치테이블 웹]</td>
                    <td style="border: 1px solid black;">SMS발송(앱 설치주소) 및 부정이용 방지</td>
                    <td style="border: 1px solid black;">휴대전화번호</td>
                    <td style="border: 1px solid black;">목적달성 1일 후 파기</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">[이벤트 페이지]</td>
                    <td style="border: 1px solid black;">이벤트 응모 및 안내, 경품 지급</td>
                    <td style="border: 1px solid black;">휴대전화번호</td>
                    <td style="border: 1px solid black;">이벤트 종료 후 파기</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">[히스토리 연동]</td>
                    <td style="border: 1px solid black;">방문 매장 방문 정보 연동</td>
                    <td style="border: 1px solid black;">휴대전화번호<br>방문 매장명<br>방문일시<br>방문 인원</td>
                    <td style="border: 1px solid black;">서비스 연동 해지 시 파기</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">[연락처 연결]</td>
                    <td style="border: 1px solid black;">연락처 연동을 통한 친구 추가</td>
                    <td style="border: 1px solid black;">이용자의 기기에 저장되어있는 휴대전화번호</td>
                    <td style="border: 1px solid black;">서비스 연동 해지 시 파기</td>
                  </tr>
                </tbody>
              </table><br>
              <p>3) 회사 내부 정책에 의하여 수집·이용되는 이용자의 정보는 아래와 같습니다.</p><br>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">구분</th>
                    <th style="border: 1px solid black;">수집·이용 목적</th>
                    <th style="border: 1px solid black;">수집 항목</th>
                    <th style="border: 1px solid black;">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">회사 내부정책</td>
                    <td style="border: 1px solid black;">회원가입 남용(부정거래), 서비스 부정사용(허위리뷰, 이벤트 부정혜택 등) 확인 및 방지</td>
                    <td style="border: 1px solid black;">휴대전화번호, 이메일주소, 기기정보, CI/DI</td>
                    <td style="border: 1px solid black;">회원탈퇴 후 3년간 보관</td>
                  </tr>
                </tbody>
              </table><br>
              <p>4) 서비스 이용과정에서 아래 자동 수집 정보가 생성되어 수집, 저장, 조합, 분석될 수 있습니다.<br>
                - IP 주소, 쿠키, 서비스 이용 기록, 기기 정보(기기고유번호, OS버전, 모델명, 제조사 정보 등), 광고ID, 통신기록등</p><br>
              <p>5) 회사는 회원관리, 불법 및 부정이용 방지, 서비스 이용기록 통계 및 분석, 서비스 개선, 신규서비스 개발 목적으로 수집한 모든 개인정보와 자동 수집 정보를 사용할 수 있습니다.
              </p>
              <br>

              <p style="color: black; font-size: 16px;"><b>2. 개인정보 제3자 제공</b></p><br>
              <P>회사는 이용자의 개인정보를 개인정보 수집·이용 목적에서 명시한 범위 내에서 사용하며, 이용자의 사전 동의 없이 개인정보 수집·이용 목적 범위를 초과하여 이용하거나 원칙적으로 이용자의
                개인정보를
                제공하지 않습니다. 다만, 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우에는 제공 받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간
                등을
                회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.</P><br>
              <p>① 이용자가 사전에 공개 또는 제3자 제공에 동의한 경우</p>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">제공받는 자</th>
                    <th style="border: 1px solid black;">제공목적</th>
                    <th style="border: 1px solid black;">수집 항목</th>
                    <th style="border: 1px solid black;">보유·이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">회원이 예약 및 대기를 신청한 레스토랑</td>
                    <td style="border: 1px solid black;">레스토랑 예약 및 대기 서비스 제공(서비스 계약 이행, 예약 및 대기자 확인, 예약 및 대기 관리, 재방문고객
                      식별,
                      고객 상담, 고객 관리, 문의 및 상담) 및 제공거절</td>
                    <td style="border: 1px solid black;">휴대전화번호, 예약 및 대기자명, 결제정보, 기타 예약 및 대기를 위해 필요한 정보</td>
                    <td style="border: 1px solid black;">예약 및 대기를 통한 레스토랑 방문일로부터 6개월이 경과한 때까지 보관. 단, (i) 매장이 방문일로부터 2년
                      이내의
                      기간을 정해 제공거절목록에 등록한 경우 매장이 제공거절목록 등록을 해제하는 때와 방문일로부터 6개월이 경과한 때 중 나중에 도래하는 때까지 보관하고, (ii) 관계법령에 정해진
                      규정이
                      있는 경우 이에 따라 법정기간 동안 보관함</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">고객이 예약 및 대기를 신청하기 위해 사용한 멀티플랫폼 서비스 제공자</td>
                    <td style="border: 1px solid black;">멀티플랫폼 서비스 App 내에서 레스토랑 예약 및 대기, 이용 기록을 확인, 관리</td>
                    <td style="border: 1px solid black;">고객을 식별할 수 있는 정보로서 멀티플랫폼 서비스 제공자가 와드에 제공한 정보, 예약 및 대기 신청 정보,
                      방문일시,
                      방문인원</td>
                    <td style="border: 1px solid black;">목적달성(멀티플랫폼 서비스 회원 탈퇴 등)후 지체없이 파기(단, 관련법령에 따라 별도 보관되는 정보는 예외)
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">카드사(삼성 / 현대 / 롯데 / 하나 / 신한 / 비씨 / KB국민 / NH농협 / VISA / MASTERS
                      /
                      JCB / AMEX / UNIONPAY)</td>
                    <td style="border: 1px solid black;">본인명의 결제 수단 인증, 결제 처리, 부정이용 방지</td>
                    <td style="border: 1px solid black;">카드번호, 카드비밀번호 앞2자리, 유효기간(월/년도), CI, 휴대전화번호,생년월일, 성별</td>
                    <td style="border: 1px solid black;">카드 등록 해지 시까지(단, 관련법령에 따라 보관되는 정보는 예외)</td>
                  </tr>
                </tbody>
              </table><br>
              <p>② 회사는 멀티플랫폼 서비스를 제공하는 사업자(이하 “멀티플랫폼 협력사”라 한다)의 채널을 통해 서비스에 진입하여 예약 및 대기를 이용한 경우 다음의 기준에 따라 정보주체의 동의 없이
                (i)
                그 예약 및 대기 이용기록 및 (ii) 정보주체를 식별할 수 있는 정보로서 멀티플랫폼 협력사로부터 제공받은 정보를, 정보주체가 서비스에 진입하기 위해 이용한 멀티플랫폼 협력사에 제공할 수
                있습니다.
              </p><br>
              <p>(1) 당초 수집 목적과의 관련성: 예약 및 대기 이용자에 한하여 해당 예약 및 대기 이용기록을 확인할 수 있도록 하는 것을 목적으로 합니다.</p><br>
              <p>(2) 예측 가능성: 예약 및 대기 신청 화면에서, 예약 및 대기 이용기록은 파트너 채널에서 확인할 수 있음을 고지하겠습니다.</p><br>
              <p>(3) 회사는 파트너 서비스 채널이 이미 정보주체의 개인정보를 보유한 점, 예약 및 대기 이용 시 그 이용기록 열람은 반드시 필요한 점, 멀티플랫폼 협력사의 채널에서 이용기록 삭제
                기능이
                제공되는 점, 이용기록 연동을 원치 않는 자는 즉시 제공 중단조치를 취하는 점 등을 포함하여 정보주체의 이익이 부당하게 침해되지 아니하도록 고려하였습니다.</p><br>
              <p>(4) 멀티플랫폼 협력사의 채널에 제공되는 정보는 암호화 등 안전한 조치를 거쳐 전송됩니다.</p><br>
              <p>③ 관계 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사 기관의 요구가 있는 경우</p><br>
              <p style="color: black; font-size: 16px;"><b>3.개인정보 처리위탁</b></p><br>
              <p>① 회사는 원활하고 향상된 서비스를 제공하기 위해서 개인정보 처리 업무를 다른 회사에 위탁할 수 있습니다. 회사는 개인정보 처리 업무 위탁 시 이용자의 개인정보가 안전하게 처리될 수
                있도록
                관리·감독하며 다른 목적으로 이용자의 개인정보를 처리하지 않도록 제한합니다.</p><br>
              <p>② 회사는 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p><br>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">수탁업체</th>
                    <th style="border: 1px solid black;">위탁업무 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">나이스페이먼츠㈜</td>
                    <td style="border: 1px solid black;">전자 결제 처리</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">엑심베이 주식회사</td>
                    <td style="border: 1px solid black;">해외 카드 결제 처리</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">Adjust</td>
                    <td style="border: 1px solid black;">사용자의 서비스/상품 이용 통계 및 분석</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">㈜NHN (토스트)</td>
                    <td style="border: 1px solid black;">휴대폰 문자 메시지(SMS,LMS, App push) 발송 관련 서비스</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">슈어엠</td>
                    <td style="border: 1px solid black;">카카오 알림톡 서비스</td>
                  </tr>
                </tbody>
              </table><br>
              <p style="color: black; font-size: 16px;"><b>4.개인정보의 파기절차 및 방법</b></p><br>
              <p>① 회사는 이용자의 개인정보를 원칙적으로 보유·이용기간의 경과, 처리목적 달성, 서비스 이용약관에 따른 계약해지 등 개인 정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                파기합니다.
              </p><br>
              <p>② 이용자로부터 동의 받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의
                데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. - 다른 법령에 따라 개인정보를 보관하는 경우는 다음과 같습니다.</p><br>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">법령</th>
                    <th style="border: 1px solid black;">항목</th>
                    <th style="border: 1px solid black;">기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">전자상거래 등에서의 소비자보호에 관한 법률</td>
                    <td style="border: 1px solid black;">계약 또는 청약철회 등에 관한 기록</td>
                    <td style="border: 1px solid black;">5년</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">전자상거래 등에서의 소비자보호에 관한 법률</td>
                    <td style="border: 1px solid black;">대금결제 및 재화 등의 공급에 관한 기록</td>
                    <td style="border: 1px solid black;">5년</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">전자상거래 등에서의 소비자보호에 관한 법률</td>
                    <td style="border: 1px solid black;">소비자의 불만 또는 분쟁 처리에 관한 기록</td>
                    <td style="border: 1px solid black;">3년</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">위치정보의 보호 및 이용 등에 관한 법률</td>
                    <td style="border: 1px solid black;">개인위치정보에 관한 기록</td>
                    <td style="border: 1px solid black;">6개월</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">전자금융거래법</td>
                    <td style="border: 1px solid black;">전자금융 거래에 관한 기록</td>
                    <td style="border: 1px solid black;">5년</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">통신비밀보호법</td>
                    <td style="border: 1px solid black;">서비스 이용 관련 개인정보(로그기록)</td>
                    <td style="border: 1px solid black;">3개월</td>
                  </tr>
                </tbody>
              </table><br>
              <p>③ 회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의 개인정보를 파기하거나 별도로 분리하여 저장할 수 있습니다.
                - 이 경우 회사는 개인정보가 파기되거나 분리되어 저장·관리된다는 사실, 서비스 미이용 기간 만료일, 해당 개인정보의 항목을 공지사항, 전자우편 등의 방법으로 미이용 기간 30일 전에
                이용자에게
                알릴 수 있습니다. 이를 위해 이용자는 회사에게 정확한 연락처 정보를 알리거나 수정하여야 합니다.</p><br>
              <p>④ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                - 파기 절차 : 회사는 파기 사유가 발생한 개인정보를 개인정보 보호 책임자의 승인 절차를 거쳐 파기합니다.
                - 파기 방법 : 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로
                분쇄하거나
                소각등을 통하여 파기합니다.</p><br>
              <p style="color: black; font-size: 16px;"><b>5.이용자 및 법정대리인의 권리와 그 행사방법</b></p><br>
              <p>① 이용자가 직접 자신의 개인정보를 조회, 수정, 삭제하는 것을 원칙으로 하며, 회사는 이를 위한 기능을 제공합니다.
                ② 이용자 및 법정대리인은 개인정보의 조회,수정,삭제를 요청할 수 있으며, 회사는 정책에 따라 본인확인 절차를 거쳐 이를 조치하겠습니다.
                ③ 이용자께서 개인정보의 오류에 대한 정정을 요구하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는
                정정
                처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.
                ④ 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.
                ⑤ 타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌 받을 수 있습니다.
                ⑥ 이용자는 전자우편, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여 할 수 없습니다.</p><br>
              <p style="color: black; font-size: 16px;"><b>6.개인정보 자동수집장치의 설치/운영 및 거부에 관한 사항</b></p><br>
              <p>① 온라인 맞춤형 광고
                (1) 온라인 맞춤형 광고는 이용자의 관심, 흥미, 기호 및 성향 등을 분석/추정한 후 이용자에게 맞춤형으로 제공되는 온라인 광고입니다.
                (2) 회사는 온라인 맞춤형 광고 사업자가 이용자의 광고 ID및 행태정보를 수집하도록 허용하고 있습니다.
                - 광고ID는 모바일 OS사업자가 광고 목적으로 모바일 기기에 부여한 정보(ADID, IDFA)입니다.
                - 행태정보는 앱 사용이력, 구매 및 검색 이력 등에 관한 정보입니다.
                (3) 이용자가 사이트를 방문하거나 앱을 실행할 때 자동 수집되며, 수집·처리하는 광고 사업자는 아래와 같습니다.
                - 구글, 페이스북
                (4) 회사는 온라인 맞춤 광고 제공을 위해 아래와 같이 정보를 제공합니다. 회사는 광고 ID로 개인을 식별할 수 없으며 다른 개인정보를 함께 제공하지 않습니다.
                - 행태정보를 제공받는 자 : ㈜카카오
                - 제공하는 행태정보의 항목 : 광고 ID
                - 행태정보를 제공받는 자의 이용 목적 : 온라인 맞춤 광고 제공
                (5) 행태정보 수집 및 맞춤형 광고 노출을 원하지 않는 이용자는 아래 방법을 통해 해제할 수 있습니다.
                - Android : 설정 > google > 광고 > 광고 맞춤 설정 해제
                - IOS : 설정 > 개인 정보 보호 > 광고 > 광고 추적 제한 ON</p><br>
              <p style="color: black; font-size: 16px;"><b>7.개인정보의 기술적/관리적 보호대책</b></p><br>
              <p>회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 보호대책을 강구하고 있습니다.
                ① 비밀번호의 암호화
                이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인, 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
                ② 해킹 등에 대비한 대책
                (1) 회사는 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.
                (2) 최신 백신 프로그램을 이용하여 이용자들의 개인정보나 자료가 유출되거나 손상되지 않도록 방지하고 있습니다.
                (3) 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.
                (4) 민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.
                ③ 개인정보 처리 최소화 및 교육
                회사는 개인정보 관련 처리 담당자를 최소한으로 제한하며, 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 내부방침 등의 준수를 강조하고 있습니다.
                ④ 개인정보보호 전담담당부서 운영
                회사는 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 해결하고 바로 잡을 수 있도록
                최선을
                다하고 있습니다.

              </p><br>
              <p style="color: black; font-size: 16px;"><b>8.개인정보 보호책임자</b></p><br>
              <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 고객님의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 담당자를
                지정하고
                있습니다.
                ② 이용자께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당자에게 문의하실 수
                있습니다.
                회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p><br>

              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">구분</th>
                    <th style="border: 1px solid black;">성명</th>
                    <th style="border: 1px solid black;">연락처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">개인정보보호책임자</td>
                    <td style="border: 1px solid black;">정휘제</td>
                    <td style="border: 1px solid black;">help@dsil.co.kr</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">개인정보보호담당자</td>
                    <td style="border: 1px solid black;">정휘제</td>
                    <td style="border: 1px solid black;">help@dsil.co.kr</td>
                  </tr>
                </tbody>
              </table><br>
              <p style="color: black; font-size: 16px;"><b>9.기타 개인정보침해에 대한 신고 및 상담</b></p><br>
              <p>이용자는 아래 이 기관에 대해 개인정보 침해에 대한 피해구제 상담 등을 문의하실 수 있습니다. 아래의 기관은 정보기관 소속으로서, 회사의 자체적인 개인정보 불만처리 또는 개인정보
                피해구제
                결과에 만족하지 못하실 경우, 자세한 도움이 필요하실 경우에는 문의하여 주시기 바랍니다.</p><br>
              <table style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid black;">기관</th>
                    <th style="border: 1px solid black;">전화번호</th>
                    <th style="border: 1px solid black;">웹사이트</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid black;">개인정보 침해신고센터</td>
                    <td style="border: 1px solid black;">118</td>
                    <td style="border: 1px solid black;"><a href="https://privacy.kisa.or.kr"
                        target="_blank">privacy.kisa.or.kr</a></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">대검찰청 사이버범죄수사단</td>
                    <td style="border: 1px solid black;">1301</td>
                    <td style="border: 1px solid black;"><a href="https://www.spo.go.kr"
                        target="_blank">www.spo.go.kr</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">경찰청 사이버안전국</td>
                    <td style="border: 1px solid black;">182</td>
                    <td style="border: 1px solid black;"><a href="https://www.cyber.go.kr"
                        target="_blank">www.cyber.go.kr</a></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid black;">전자거래분쟁조정위원회</td>
                    <td style="border: 1px solid black;">1661-5714</td>
                    <td style="border: 1px solid black;"><a href="https://www.ecmc.or.kr"
                        target="_blank">www.ecmc.or.kr</a>
                    </td>
                  </tr>
                </tbody>
              </table><br>
              <p style="color: black; font-size: 16px;"><b>10.고지의 의무</b></p><br>
              <p>10. 고지의 의무
                ① 현 개인정보처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 내용추가, 삭제 및 수정이 있을 시에는 홈페이지의 ‘공지사항’을 통해 고지할
                것입니다.
                ② 현 개인정보처리방침은 2024년 05월 02일부터 적용되며, 변경 전의 개인정보처리방침은 공지사항을 통해서 확인하실 수 있습니다.
                - 공고일자 : 2024년 05월 02일
                - 시행일자 : 2024년 05월 02일</p>

            </v-card-text>
            <v-card-actions style="justify-content: flex-end;">
              <v-btn color="primary" @click="privacyModal = false" class="btn-large">닫기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- 예약 정보 및 결제 내역 표시 -->
        <div
          style="background-color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 91.5%; margin: 20px auto;">
          <v-card-text class="reservation-info">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <span>예약정보</span><br>
                <span style="font-weight: bold; font-size: 16px;">결제 금액:</span><br>
                <span>예약금 총액:</span><br>
                <span>사용 밥알:</span>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 16px; font-weight: bold;">{{ selectedDateTime }}시 {{ numberOfPeople
                  }}명</span><br>
                <span style="font-size: 16px; font-weight: bold; color: red;">{{ depositAmount * numberOfPeople -
      riceBallInput }}원</span><br>
                <span>{{ depositAmount * numberOfPeople }}원</span><br>
                <span>{{ riceBallInput }}밥알</span>
              </div>
            </div>
          </v-card-text>
          <div style="text-align: center; margin-top: 20px;">
            <v-btn color="primary" large width="460px" @click="payment" :disabled="!isPaymentButtonEnabled">결제하기</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- 방문자 입력 모달 -->
    <v-dialog v-model="visitorModal" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">방문자 입력</v-card-title>
        <v-card-text>
          <!-- 방문자 성함 입력 -->
          <v-text-field v-model="visitorName" label="방문자 성함" placeholder="방문하실 분의 성함을 입력해 주세요."
            v-if="showVisitorFields"></v-text-field>
          <!-- 방문자 연락처 입력 -->
          <v-text-field v-model="visitorContact" label="방문자 연락처" placeholder="방문하실 분의 번호를 입력해 주세요(숫자만 기입)." type="tel"
            v-if="showVisitorFields" @input="formatPhoneNumber" :maxlength="13" pattern="[0-9]*"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="min-width: 150px; background-color: #D23F57; color: white;" @click="confirmVisitor">확인</v-btn>
          <v-btn text style="min-width: 150px; background-color: #E0E0E0; color: black;"
            @click="cancelVisitor">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 결제 완료 이후 데이터 넘어갈때 로딩 스피너 추가 -->
    <div v-if="showSpinner" class="spinner-overlay">
      <div class="spinner"></div>
    </div>


    <!-- 결제 시간 만료 alert창 -->
    <v-snackbar v-model="alertSnackbar" :timeout="null">
      {{ alertMessage }}
      <v-btn color="red" text @click="dismissAlert">닫기</v-btn>
    </v-snackbar>
  </v-col>
</template>

<script>
import axios from 'axios';

export default {
  name: "DateTimePicker",
  props: {
    restaurantName: String
  },
  data() {
    return {
      timer: '7:00',
      timerInterval: null,
      date: null,
      modal: false,
      selectedDateTime: null,
      selectedHour: '',
      selectedMinute: '',
      riceBallInput: '',
      numberOfPeople: 1,
      timeOptions: [],
      depositAmount: 0,
      riceBallPoints: 100,
      totalRiceBallPoints: 0,
      showConfirmationModal: false,
      showPaymentModal: false,
      showReservationConfirmationModal: false,
      alertSnackbar: false,
      alertMessage: "",
      visitorName: '',
      visitorContact: '',
      visitorModal: false,
      showVisitorFields: false,
      paymentAmount: 0,
      customerRequest: '',
      privacyModal: false,
      reservationPolicyAgreed: false,
      agreeTerms: false,
      htmlContent: '',
      showSpinner: false,
      customerRequest: '',
      selectedButtonIndex: null,
      currentTime: new Date(),
      selectedDate: new Date(),
      user: null,
      restaurant_table_count: 0, // 테이블 수 추가
    };
  },
  mounted() {
    this.generateTimeOptions();
    this.fetchUserInfo();
    this.fetchRestaurantInfo(this.$route.params.id); // 음식점 ID를 전달하여 음식점 정보 가져오기
  },
  watch: {
    selectedDate(newVal) {
      // 선택된 날짜가 변경될 때마다 현재 시간을 갱신
      this.currentTime = new Date();
    },
    showConfirmationModal(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    },
    showPaymentModal(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    },
    riceBallInput(newVal) {
      this.validateRiceBallInput();
    },
    numberOfPeople(newVal) {
      this.validateRiceBallInput();
    },
    depositAmount(newVal) {
      this.validateRiceBallInput();
    }
  },
  computed: {
    maxRiceBallInput() {
      return this.depositAmount * this.numberOfPeople;
    },
    isPaymentButtonEnabled() {
      // 두 체크박스가 모두 체크되었을 때 결제하기 버튼을 활성화
      return this.reservationPolicyAgreed && this.agreeTerms;
    },
    minDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
    calculateDeposit() {
      return this.numberOfPeople * this.depositAmount;
    },
    calculateTotalRiceBallPoints() {
      return this.totalRiceBallPoints + this.riceBallPoints;
    }
  },
  created() {
    this.startTimer();
    this.totalRiceBallPoints = this.calculateTotalRiceBallPoints;
    this.generateTimeOptions();
  },
  destroyed() {
    clearInterval(this.timerInterval);
  },

  methods: {
    async fetchRestaurantInfo() {
      try {
        const restaurantId = this.$route.params.id
        const response = await axios.get(`${process.env.API_URL}/restaurant/detail/${restaurantId}`);
        
        if (response.status === 200) {
          const restaurantInfo = response.data[0]; // 배열의 첫 번째 항목을 가져옴

          if (restaurantInfo && restaurantInfo.restaurant_deposit !== undefined) {
            this.depositAmount = restaurantInfo.restaurant_deposit;
            this.restaurant_table_count = restaurantInfo.restaurant_table_count;
            console.log('Deposit Amount:', this.depositAmount);
            console.log('테이블 갯수 ', this.restaurant_table_count);
            if (this.numberOfTables > this.restaurant_table_count) {
              console.log("예약 가능한 테이블 수가 모자릅니다.");
              alert("예약 가능한 테이블 수가 모자릅니다.");
            }
          } else if (restaurantInfo.restaurant_deposit == null) {
            this.showConfirmationModal = true;
          }
        } else {
          console.error('Failed to fetch restaurant info:', response);
          throw new Error('Failed to fetch restaurant info');
        }
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    },
    async login(username, password) {
      try {
        const response = await axios.post(`${process.env.API_URL}/memberManage/loginPage`, {
          username,
          password
        });
        if (response.status === 200 && response.headers['authorization']) {
          const token = response.headers['authorization'].split(' ')[1]; // 'Bearer ' 부분 제거
          localStorage.setItem('token', token); // 토큰을 localStorage에 저장
          console.log('Login successful, token stored');

          // JWT 토큰에서 회원 아이디 추출
          const payload = JSON.parse(atob(token.split('.')[1]));
          const memberId = payload.sub; // JWT 페이로드에서 회원 아이디 추출 (sub 필드 사용 가정)

          // 회원 아이디를 서버에 POST로 전달
          await this.sendMemberId(memberId);

          this.fetchUserInfo(); // 로그인 후 사용자 정보 요청
        } else {
          console.error('Login failed:', response);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },

    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error('No token found');
        }
        // 토큰을 Authorization 헤더에 포함하여 요청 보내기
        const response = await axios.get(`${process.env.API_URL}/userInfo/me`, {
          headers: {
            'Authorization': `Bearer ${token}` // "Bearer "를 추가
          },
          withCredentials: true
        });
        if (response.status === 200) {
          const userInfo = response.data;
          console.log('User Info:', userInfo);
          // 사용자 정보를 상태나 컴포넌트 데이터에 저장
          this.user = userInfo;
          console.log(this.user);
          this.totalRiceBallPoints = userInfo.point.currentPoint || 0;
        } else {
          console.error('Failed to fetch user info:', response);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    validateRiceBallInput() {
      if (this.riceBallInput > this.maxRiceBallInput) {
        this.riceBallInput = this.maxRiceBallInput;
      }
    },
    cancelPayment() {
      axios.post('http://localhost:8000/restaurant/cancelreservation', {
        restaurantId: this.$route.params.id,
        numberOfTables: this.tablesNeeded // 예약 시 차감했던 테이블 수
      })
        .then(response => {
          console.log('테이블이 성공적으로 복원되었습니다:', response.data);
          this.resetReservationData();
        })
        .catch(error => {
          console.error('테이블 복원 중 오류가 발생했습니다:', error);
          alert("테이블 복원 중 오류가 발생했습니다.");
        });
      this.showPaymentModal = false;
      this.resetReservationData();
    },

    formatPhoneNumber() {
      let cleaned = ('' + this.visitorContact).replace(/\D/g, '');
      let match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);

      if (match) {
        this.visitorContact = `${match[1]}-${match[2]}-${match[3]}`;
      } else {
        this.visitorContact = cleaned;
      }
    },
    showPrivacyModal() {
      this.privacyModal = true;
    },
    openVisitorModal() {
      this.showVisitorFields = true;
      this.visitorModal = true;
    },
    confirmVisitor() {
      this.showVisitorFields = false;
      this.visitorModal = false;
    },
    cancelVisitor() {
      this.visitorName = '';
      this.visitorContact = '';
      this.showVisitorFields = false;
      this.visitorModal = false;
    },
    resetTimer() {
      this.timer = '7:00';
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    },
    startTimer() {
      this.resetTimer();
      let duration = 420; //시간 7분 설정  
      this.timerInterval = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        this.timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        duration--;
        if (duration < 0) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          this.timer = '7:00';
          if (this.showConfirmationModal || this.showPaymentModal) {
            this.alertMessage = "결제 시간이 만료되었습니다.";
            this.alertSnackbar = true;
            this.showConfirmationModal = false;
            this.showPaymentModal = false;
          }
        }
      }, 1000);
    },
    dismissAlert() {
      this.alertSnackbar = false;
      this.showPaymentModal = false;
      this.$router.push(`/restaurant/detail/${this.$route.params.id}`);
    },
    handleInputChange() {
      if (isNaN(this.riceBallInput) || this.riceBallInput.includes("-")) {
        this.riceBallInput = this.riceBallInput.replace("-", "");
      }
      if (parseInt(this.riceBallInput) > this.totalRiceBallPoints) {
        this.riceBallInput = this.totalRiceBallPoints.toString();
      }
    },
    generateTimeOptions() {
      this.timeOptions = []; // 배열 초기화
      for (let hour = 12; hour <= 21; hour++) {
        this.timeOptions.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    },
    selectTime(index) {
      if (this.isDisabled(this.timeOptions[index])) return;

      this.selectedButtonIndex = index;
      const time = this.timeOptions[index];
      const [hour, minute] = time.split(":");
      this.selectedHour = hour;
      this.selectedMinute = minute;
    },
    isDisabled(time) {
      const [hour, minute] = time.split(":").map(Number);
      const currentHour = this.currentTime.getHours();
      const currentMinute = this.currentTime.getMinutes();

      const selectedDate = new Date(this.date); // 선택한 날짜로부터 Date 객체 생성
      const currentDate = new Date();

      const isToday = selectedDate.toDateString() === currentDate.toDateString();

      if (isToday) {
        if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
          return true;
        }
      }

      return false;
    },
    isSelected(time) {
      const [hour, minute] = time.split(":");
      return this.selectedHour === hour && this.selectedMinute === minute;
    },
    timeToEnum(time) {
      const [hour] = time.split(":").map(Number);
      let period = "AFTERNOON";

      if (hour >= 12 && hour <= 21) {
        let hourEnum = hour === 12 ? 12 : hour - 12;
        return `${period}_${hourEnum}`;
      } else {
        throw new Error("Invalid time period");
      }
    },
    set() {
      if (this.date && this.selectedHour && this.selectedMinute && this.numberOfPeople > 0) {
        const dateTime = new Date(this.date);
        dateTime.setHours(parseInt(this.selectedHour));
        dateTime.setMinutes(parseInt(this.selectedMinute));

        this.selectedDate = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1).toString().padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;
        this.selectedTime = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;

        this.selectedDateTime = `${this.selectedDate} ${this.selectedTime}`;

        const people = this.numberOfPeople;
        const tablesNeeded = Math.ceil(people / 4);

        this.tablesNeeded = tablesNeeded;

        axios.post('http://localhost:8000/restaurant/reservetable', {
          numberOfTables: tablesNeeded,
          restaurantId: this.$route.params.id // 이 부분을 추가하여 restaurantId를 전달합니다.

        })
          .then(response => {
            // 성공적으로 테이블이 선점된 경우
            console.log('테이블이 성공적으로 선점되었습니다:', response.data);
            // 예약 가능한 테이블이 충분한 경우
            this.showConfirmationModal = true; // 확정 모달 창 표시
          })
          .catch(error => {
            // 테이블 선점 중 오류 발생 시의 처리
            alert("남은 테이블이 없어 예약에 실패하였습니다.");
          });

        // 기존 모달 창은 닫기
        this.modal = false;
      }
    },
    handleTouchMove(event) {
      if (Math.abs(event.touches[0].clientY - event.touches[0].pageY) > 10) {
        event.preventDefault();
      }
    },
    cancelReservation() {
      axios.post('http://localhost:8000/restaurant/cancelreservation', {
        restaurantId: this.$route.params.id,
        numberOfTables: this.tablesNeeded // 예약 시 차감했던 테이블 수
      })
        .then(response => {
          console.log('테이블이 성공적으로 복원되었습니다:', response.data);
          this.resetReservationData();
        })
        .catch(error => {
          console.error('테이블 복원 중 오류가 발생했습니다:', error);
          alert("테이블 복원 중 오류가 발생했습니다.");
        });
      this.modal = false;
      this.showConfirmationModal = false;
      this.resetReservationData();
    },
    confirmReservation() {
      if (this.depositAmount) {
        this.showConfirmationModal = false;
        this.showPaymentModal = true;
      } else {
        this.showConfirmationModal = false;
        this.showReservationConfirmationModal = true;

        const timeEnum = this.timeToEnum(`${this.selectedHour}:${this.selectedMinute}`);

        const reservationData = {

          reservationDate: this.selectedDate,
          peopleCount: this.numberOfPeople,
          reservationTime: timeEnum,
          depositAmount: this.depositAmount,
          restaurantId: this.$route.params.id
        };
        if (this.user) {
          reservationData.memberId = this.user.id;

        }
        if (this.riceBallInput > 0) {
          // 사용한 포인트만큼 차감
          this.totalRiceBallPoints -= this.riceBallInput;
          // 서버에도 업데이트된 포인트 정보 전송
          this.updateUserPoints();
        }
        // axios를 사용하여 백엔드로 예약 정보 전송
        axios.post(`http://localhost:8000/restaurant/detail`, reservationData)
          .then(response => {
            // 예약 정보가 성공적으로 전송되었을 때의 처리
            console.log('예약 정보가 성공적으로 전송되었습니다:', reservationData);
            setTimeout(() => {
              this.$router.go(0); // 혹은 window.location.reload();
            }, 4000); if (response.data.success) {
              // 예약 성공적으로 처리된 경우
              console.log('예약이 성공적으로 처리되었습니다.');
            }
          })
          .catch(error => {
            // 예약 정보 전송 중 오류 발생 시의 처리
            console.error('예약 정보 전송 중 오류가 발생했습니다:', error);
          });
      }
    },
    confirmReservation2() {
      if (this.depositAmount) {
        this.showConfirmationModal = false;
        this.showPaymentModal = true;
      } else {
        this.fetchRestaurantInfo(this.$route.params.id); // 음식점 ID를 전달하여 음식점 정보 가져오기
        this.showConfirmationModal = false;
        this.showReservationConfirmationModal = true;
      }
    },
    payment() {
      // 결제하기 버튼 활성화를 위해 두 체크박스의 상태를 확인
      if (this.reservationPolicyAgreed && this.agreeTerms) {
        const depositAmount = this.depositAmount;
        const numberOfPeople = this.numberOfPeople;
        const riceBallInput = this.riceBallInput;
        const totalAmount = depositAmount * numberOfPeople - riceBallInput;
        const merchantUid = `${this.restaurantName}${Date.now()}`

        // 결제 정보 설정
        this.paymentData = {
          pg: 'html5_inicis',
          pay_method: totalAmount === 0 ? "point" : "card",
          merchant_uid: merchantUid,
          name: this.restaurantName,
          amount: totalAmount,
          buyer_email: "",
          buyer_name: "",
          buyer_tel: "",
          paymentTime: new Date().toISOString(),
          pointUsage: riceBallInput
        };

        const timeEnum = this.timeToEnum(`${this.selectedHour}:${this.selectedMinute}`);

        this.reservationData = {
          peopleCount: this.numberOfPeople,
          reservationDate: this.selectedDate,
          reservationTime: timeEnum,
          reservationName: this.visitorName,
          reservationTel: this.visitorContact,
          requestContent: this.customerRequest,
          restaurantId: this.$route.params.id
        };

        if (this.user) {
          this.reservationData.memberId = this.user.id; // memberId 추가
        }

        // 결제 금액이 0원인 경우 결제 프로세스 생략하고 바로 예약 완료 처리
        if (totalAmount === 0) {
          this.showSpinner = true;
          const pointData = {
            ...this.paymentData,
            pay_method: "point",
            pointUsage: riceBallInput
          }
          axios.post(`http://localhost:8000/restaurant/detail`, this.reservationData)
            .then(reservationResponse => {
              console.log('예약 정보가 서버에 전송되었습니다:', reservationResponse.data);
              // 예약 정보 전송 후에 결제 정보를 서버에 보냅니다.
              const reservationId = reservationResponse.data;
              axios.post('http://localhost:8000/restaurant/payment', pointData, {
                params: {
                  reservationId: reservationId
                }
              })
                .then(paymentResponse => {
                  this.showSpinner = false;
                  this.showPaymentModal = false;
                  console.log('결제 정보가 서버에 전송되었습니다:', paymentResponse.data);
                  this.$router.push(`/restaurant/detail/${this.$route.params.id}`);
                  alert("예약 및 결제가 완료되었습니다.");
                  this.resetReservationData();
                })
                .catch(paymentError => {

                  console.error('결제 정보를 서버에 전송하는 중에 오류가 발생했습니다:', paymentError);

                  this.showSpinner = false;
                });
            })
            .catch(reservationError => {
              console.error('예약 정보를 서버에 전송하는 중에 오류가 발생했습니다:', reservationError);
              this.showSpinner = false;
            });
        } else {
          // 결제 함수 정의
          const paymentFunction = () => {
            IMP.init('imp56476634');
            IMP.request_pay(this.paymentData, (rsp) => { // 화살표 함수로 콜백 함수 정의
              if (rsp.success) {
                const impUid = rsp.imp_uid;
                this.showSpinner = true;

                // 예약 정보를 서버에 전송
                axios.post(`http://localhost:8000/restaurant/detail`, this.reservationData)
                  .then(reservationResponse => {
                    console.log('예약 정보가 서버에 전송되었습니다:', reservationResponse.data);
                    // 결제 정보를 서버에 전송
                    const reservationId = reservationResponse.data;
                    const paymentDataWithImpUid = {
                      ...this.paymentData,
                      impUid: impUid  // Add imp_uid to the payment data
                    };
                    axios.post('http://localhost:8000/restaurant/payment', paymentDataWithImpUid, {
                      params: {
                        reservationId: reservationId
                      }
                    })
                      .then(paymentResponse => {
                        this.showSpinner = false;
                        this.showPaymentModal = false;
                        console.log('결제 정보가 서버에 전송되었습니다:', paymentResponse.data);
                        // 결제 및 예약 정보가 성공적으로 처리되면 페이지 이동
                        this.$router.push(`/restaurant/detail/${this.$route.params.id}`);
                        
                        alert("결제 완료 : " + "고객님의 예약이 완료되었습니다.");
                        this.resetReservationData();
                        window.location.reload();
                      })
                      .catch(paymentError => {
                        console.error('결제 정보를 서버에 전송하는 중에 오류가 발생했습니다:', paymentError);
                        this.showSpinner = false;
                      });
                  })
                  .catch(reservationError => {
                    console.error('예약 정보를 서버에 전송하는 중에 오류가 발생했습니다:', reservationError);
                    this.showSpinner = false;
                  });
              } else {
                alert("(" + rsp.error_msg + ")");
                this.$router.push(`/restaurant/detail/${this.$route.params.id}`);
              }
            });
          }

          // 스크립트를 먼저 로드합니다.
          const impScript = document.createElement('script');
          impScript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
          document.head.appendChild(impScript);

          // 스크립트 로드 후에 실행합니다.
          impScript.onload = () => {
            paymentFunction();
          };
        }
      } else {
        // 두 체크박스 중 하나라도 체크되지 않은 경우 결제하기 버튼 비활성화
        console.log("두 개의 필수 동의사항에 모두 동의해야 합니다.");
      }
    },
    resetReservationData() {
      // 예약 및 결제 정보 초기화
      this.selectedDate = '';
      this.numberOfPeople = 1;
      this.selectedTime = '';
      this.visitorName = '';
      this.visitorContact = '';
      this.customerRequest = '';
      this.riceBallInput = 0;
      this.reservationPolicyAgreed = false;
      this.agreeTerms = false;
      this.date = '';
      this.selectedHour = '';
      this.selectedMinute = '';
    },

    redirectToReservation() {
      this.modal = true;
      clearInterval(this.timerInterval);
      this.$router.push(`/restaurant/detail/${this.$route.params.id}`);
    }
  },
};
</script>

<style scoped>
.v-date-picker-table {
  width: 350px;
}

.custom-card {
  background-color: rgba(251, 251, 251, 0.89);
}

input[type="number"] {
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 5px;
}

.time-buttons-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.time-buttons {
  display: inline-block;
}


.time-button {
  background-color: yellow;
  border-radius: 30px;
  width: 50px;
  height: 40px !important;
  padding: 10px;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: -6px;
  margin-bottom: 15px;
  border: 1px solid #c0c0c0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.time-button:hover {
  background-color: #FFD700;
}


.selected {
  background-color: #007bff !important;
  color: white;
}


/* 로고 관련 설정 */
.logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 130px;
  width: 130px;
}

.btn-large {
  font-size: 16px !important;
  /* 버튼 텍스트 크기 */
  padding: 10px 24px !important;
  /* 버튼 내용물 패딩 */
}

/* 결제 모달에서 식당 이름 */
.restaurant-name div {
  background-color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  margin-bottom: -10px;
  display: inline-block;
  width: 500px;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.time-description {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  /* 텍스트 색상 흐리게 설정 */
}


.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>