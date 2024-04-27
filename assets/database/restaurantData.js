export const Restaurants = [
  {
    id: '1', // 예시 ID
    name: '기영이네 존맛치킨', // 예시 식당명
    description: '치킨의 근본 휘기영',
    address: '서울시 관악구', // 예시 주소
    contact: '02-1234-5678', // 수정 가능한 연락처
    table: 10,
    deposit: '10000', // 수정 가능한 예약금
    image: require('~/assets/images/restaurants/kiyeong.jpg'), 
    chip: true,
    crowd: 'free',
},
{
    id: '2', // 예시 ID
    name: '베테랑 칼국수', // 예시 식당명
    description: '전주 전통 요리의 진수, 베칼',
    address: '서울시 관악구 남현동', // 예시 주소
    contact: '02-1234-8765', // 수정 가능한 연락처
    table: 20,
    deposit: '5000', // 수정 가능한 예약금
    image: require('~/assets/images/restaurants/beteran.jpg'),
    chip: true,
    crowd: 'free',
},
    
    
  ];

  export default Restaurants;