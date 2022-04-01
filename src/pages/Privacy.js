import { style } from '@mui/system';
import React from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import MainFooter from '../shared/MainFooter';
import MDEditor from "@uiw/react-md-editor";

import rehypeSanitize from "rehype-sanitize";

const Privacy = () => {

  const mdMermaid = `포그(poug)(이하 '회사')는 회원님의 개인정보를 중요시하며, 개인정보의 보호와 관련하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법, 전기통신사업법, 통신비밀보호법 등 개인정보와 관련된 법령 상의 개인정보 보호 규정 및 방송통신위원회가 제정한 개인정보보호지침을 준수하고 있습니다.
  회사는 개인정보취급방침을 통하여 회원님들의 개인정보가 남용되거나 유출되지 않도록 최선을 다할 것이며, 회원님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있고, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드리고자 합니다.
  단, 본 개인정보 취급방침은 정부의 법령 및 지침의 변경, 또는 보다 나은 서비스의 제공을 위하여 그 내용이 변경될 수 있으니, 회원님들께서는 사이트 방문 시 수시로 그 내용을 확인하여 주시기 바라며, 회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
  
  
  
  ### 1. 수집하는 개인정보 항목 및 이용 목적
  
  가. 회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스 이용의사를 확인하여 최적화되고 맞춤화된 서비스를 제공하기 위함입니다. 회사는 최초 회원가입 시 서비스 제공을 원활하게 하기 위해 필요한 최소한의 정보만을 수집하고 있으며 회사가 제공하는 서비스 이용에 따른 대금결제, 물품배송 및 환불 등에 필요한 정보를 추가로 수집할 수 있습니다.
  
  나. 회사는 개인정보를 수집 및 이용목적 이외에 다른 용도로 이를 이용하거나 이용자의 동의 없이 제3자에게 제공하지 않습니다.
  
  다. 다음과 같은 목적으로 개인정보를 수집하여 이용할 수 있습니다.
  ①회원 - 성명, 아이디, 비밀번호, 주민등록번호, 이메일, 연락처(일반전화 또는 휴대전화), 연계정보 : 회사가 제공하는 서비스의 이용에 따르는 본인확인, 연령제한 서비스 제공, 민원사항처리, 만 14세 미만인 경우 위 항목에 대한 법정대리인의 정보. 다만, 서비스 이용과정에서 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록 등이 생성되어 수집될 수 있습니다. 이메일주소, 전화번호, 이동전화번호, 주소 : 거래의 원활한 진행, 본인의사의 확인, 불만처리,새로운 상품, 서비스 정보와 고지사항의 안내 등 수취인 성명, 주소, 전화번호 : 상품과 경품 배송을 위한 배송지 확인 등 신용카드정보, 은행계좌정보, 이동전화번호정보 : 대금결제서비스의 제공 등
  ② 기타 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. - IP Address, 방문일시, 서비스 이용 기록 : 부정 이용 방지, 비인가 사용 방지 등
  
  라. 회사는 이용자의 개인정보를 수집할 경우 반드시 이용자의 동의를 얻어 수집하며, 이용자의 기본적 인권을 침해할 우려가 있는 인종, 출신지, 본적지, 사상, 정치적 성향, 범죄기록, 건강상태 등의 정보는 이용자의 동의 또는 법령의 규정에 의한 경우 이외에는 수집하지 않습니다.
  
  마. 당사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며 개인정보의 수집•이용에 법정대리인의 동의가 필요한 만 14세 미만 아동의 개인정보는 원칙적으로 수집하지 않습니다. 단, 법정대리인의 동의를 얻은 경우에는 만 14세 미만 이용자의 개인정보를 수집•이용할 수 있습니다.
  
  바. 회사는 수집된 회원님들의 개인정보를 다음의 목적을 위해 이용하고 있습니다.
  ①서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 - 콘텐츠 및 회원 맞춤형 서비스 제공, 서비스 구매 및 요금 결제, 금융거래 본인 인증 및 금융 서비스
  ②회원관리 -회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입회수 제한, 만 14세 미만 아동 개인정보 수집 시 법정대리인 동의여부 확인, 추후 법정대리인 동의여부 확인, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달
  ③신규서비스 개발 • 마케팅 및 광고에 활용 - 신규 서비스(컨텐츠) 개발 및 특화, 이벤트 등 광고성 정보 전달, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계
  ④시행일 이후 "회원"이 "서비스"를 이용할 시 개정약관에 동의한 것으로 간주됩니다. "회원"은 변경된 약관에 동의하지 않을 경우 이용계약을 해지할 수 있습니다.
  
  사. 회사는 다음과 같은 방법으로 개인정보를 수집할 수 있습니다.
  ①홈페이지, 서면, 팩스, 전화, 고객센터 문의하기, 이벤트 응모
  ② 생성정보 수집 툴을 통한 자동 수집.
  
  ### 2. 개인정보의 보유, 이용기간 및 파기
  
  가. 회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 개인정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
  ① 상법 등 법령에 따라 보존할 필요성이 있는 경우 - 계약 또는 청약철회 등에 관한 기록: 보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제 6조 및 시행령 제 6조: 보존기간 : 5년 - 대금결제 및 재화 등의 공급에 관한 기록: 보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제 6조 및 시행령 제 6조: 보존기간 : 5년- 소비자의 불만 또는 분쟁처리에 관한 기록 : 보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제 6조 및 시행령 제 6조: 보존기간 : 3년 본인확인에 관한 기록: 보존근거 : 정보통신망 이용촉진 및 정보보호에 관한 법률 제44조의 5 및 시행령 제 29조: 보존기간 : 6월 - 접속에 관한 기록: 보존근거 : 통신비밀보호법 제 15조의 2 및 시행령 제 41조: 보존기간 : 3개월– 부정이용기록 : 보존근거 : 부정이용의 배제 등 회사 방침에 의한 보존 : 보존기간 : 1년 - 신용정보의 수집, 처리 및 이용 등에 관한 기록: 보존근거 : 신용정보의 이용 및 보호에 관한 법률: 보존기간 : 3년 - 표시•광고에 관한 기록: 보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률: 보존기간 : 6월
  ② 회사가 보유기간을 미리 고지하고 그 보유기간이 경과하지 아니한 경우와 개별적으로 동의를 받은 경우에는 약정한 기간 동안 보존합니다.
  ③ 수집된 개인정보의 보유•이용기간은 서비스이용계약체결(회원가입)시부터 서비스이용계약해지(탈퇴신청, 직권탈퇴 포함)입니다. 또한 동의 해지 시 회사는 이용자의 개인정보를 상기 명시한 정보보유 사유에 따라 일정 기간 저장하는 자료를 제외하고는 지체 없이 파기하며 개인정보취급이 제3자에게 위탁된 경우에는 수탁자에게도 파기하도록 지시합니다.
  ④ 파기방법 - 이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기됩니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기하고, 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기합니다.
  
  ### 3. 개인정보의 제3자 제공에 관한 사항
  
  회사는 정보 주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 회사는 현재 개인정보를 제3자에게 제공하고 있지 않습니다.
  
  ### 4. 개인정보처리 위탁
  
  회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다. 회사는 현재 개인정보를 처리업무를 위해 위탁하고 있지 않습니다.
  
  ### 5. 정보주체의 권리, 의무 및 그 행사방법
  
  이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다. 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
  
  개인정보 열람요구
  오류 등이 있을 경우 정정 요구
  삭제요구
  처리정지 요구
  제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다. 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
  
  ### 6. 개인정보의 안전성 확보 조치
  
  회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
  
  개인정보 취급 직원의 최소화 및 교육 : 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.
  정기적인 자체 감사 실시 : 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.
  내부관리계획의 수립 및 시행 : 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
  개인정보의 암호화 : 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
  해킹 등에 대비한 기술적 대책 : 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
  개인정보에 대한 접근 제한 : 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
  접속기록의 보관 및 위변조 방지 : 개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.
  문서보안을 위한 잠금장치 사용 : 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.
  비인가자에 대한 출입 통제 : 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.
  
  ### 7. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항
  회사는 이용자들에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
  1) 쿠키의 사용 목적
  이용자들이 방문한 회사의 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 뉴스편집, 이용자 규모 등을 파악하여 이용자에게 최적화된 정보 제공을 위하여 사용합니다.
  2) 쿠키의 설치·운영 및 거부
  ① 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
  ② 설정방법 예(인터넷 익스플로어 경우 : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보)
  ③ 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용에 어려움이 있을 수 있습니다.
  
  
  ### 8. 개인정보 보호책임자
  
  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
  
  개인정보 보호책임자
  성명 : 김현진
  이메일 : guswls78963210@gmail.com
  
  정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
  
  ### 9. 개인정보 처리방침 변경
  
  개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
  `;

  return (
    <>
      <Container >
        <Header />
        <Title>
          개인정보처리방침
        </Title>
        <TextBox>
          <MDEditor.Markdown
            style={{
              backgroundColor: "#393a47",
              borderRadius: "10px",
              padding: "14px 14px",
              border: "1px solid #393a47",
              color: "#fff",
              height: "auto",
              overflowY: "auto",
              maxWidth: "100%",
              lineHeight: "26px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "100px",
            }}
            source={mdMermaid}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </TextBox>
      </Container>
      <MainFooter />
    </>
  );
};



const Container = styled.div`
  background-color: #1f2029;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 730px;
  display: inline-block;
`;
const Title = styled.div`
  width: 100%;
  margin-top: 150px;
  font-style: normal;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
`;

const TextBox = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 100px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #ffffff;
`;
export default Privacy;