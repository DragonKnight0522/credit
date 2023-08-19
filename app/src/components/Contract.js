import { Modal, Button, Typography, Checkbox, message } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../api';
import isVietnamesePhoneNumber from '../utils/isCorrectNumberPhone';
import _signned from '../assets/asign.jpg';
export default function App({ profile }) {
  const [visible, setVisible] = useState(false);
  const [contract, setContract] = useState({ amount: 0, times: 6 });
  const [ticked, setTicked] = useState(localStorage.getItem('ticked'));
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/contracts');
      if (data.data.length > 0) setContract(data.data[0]);
    })();
  }, []);
  return (
    <>
      <Button
        shape="round"
        size="large"
        type="primary"
        onClick={() => setVisible(true)}
      >
        Xem hợp đồng{' '}
      </Button>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable
        onCancel={() => setVisible(false)}
      >
        <h5>
          <center>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</center>
        </h5>
        <h5>
          <center>ĐỘC LẬP - TỰ DO - HẠNH PHÚC</center>
        </h5>
        <br />
        <Typography.Title level={5} style={{ textAlign: 'center' }} strong>
          HỢP ĐỒNG VAY TIỀN
        </Typography.Title>
        <br />
        <p>Bên A (Bên cho vay) CÔNG TY CỔ PHẦN QUẢN LÝ TÀI SẢN VÀ ĐẦU TƯ TÀI CHÍNH VIETCREDIT</p>
        <p>
          Bên B (Bên vay) Ông / Bà :
          {profile?.kyc?.name || 'Cập nhật khi hoàn thành'}
        </p>
        <p>
          {' '}
          Số CMT / CCCD :{profile?.kyc?.id_number || 'Cập nhật khi hoàn thành'}
        </p>
        <p>
          Ngày ký : {moment(contract?.created_at).format('hh:mm A DD/MM/YYYY')}
        </p>
        <p>Số tiền khoản vay : {contract?.amount?.toLocaleString()} VNĐ</p>
        <p>Thời gian vay : {contract?.times} tháng</p>
        <p>lãi suất cho vay là 0.7% mỗi tháng</p>
        <p>
          Hợp đồng nêu rõ các bên đã đặt được thỏa thuận vay sau khi thương
          lượng và trên cơ sở bình đẳng , tự nguyện và nhất trí . Tất cả các bên
          cần đọc kỹ tất cả các điều khoản trong thỏa thuận này, sau khi ký vào
          thỏa thuận này coi như các bên đã hiểu đầy đủ và đồng ý hoàn toàn với
          tất cả các điều khoản và nội dung trong thỏa thuận này.
        </p>
        <Typography.Text strong>ĐIỀU 1 :</Typography.Text>
        <p>
          TIỀN GỐC : chỉ tính số tiền bên A cho bên B vay <br />
          TIỀN LÃI : chỉ tính khoản lãi liên quan tính trên số tiền gốc , bao
          gồm cả số tiền lãi trong thời hạn vay thông thường và lãi quá hạn
          <br />
          QUÁ HẠN : quá hạn sẽ phát sinh lãi quá hạn và các khoản chi phí khác
          <br />
          TRẢ NỢ : chỉ tính việc bên B hoàn trả tiền gốc và lãi của khoản vay
          hoặc thanh toán phí duyệt tín dụng nhanh , phí quản lý tài khoản
          <br /> - lãi suất cho vay là 0,7% tháng , được tính trên tổng số tiền
          vay
          <br /> - ngày trả nợ : ngày 10 hàng tháng
          <br />- phương thức trả nợ : ngân hàng sẽ tự động trừ vào thẻ ngân
          hàng khi đến kỳ hạn 1 tháng , khách hàng có thể chủ động trả nợ sau
          khi được nhân viên hướng dẫn
          <br />- cách 1 : chuyển khoản ngân hàng
          <br />- cách 2 : tại quầy giao dịch ngân hàng
          <br />- cách 3 : thế giới di động , viettel pay hoặc tất cả các dịch
          vụ chuyển tiền
          <br /> - cách 4 : thanh toán các loại ví điện tử như : momo , VN pay ,
          Zalo pay
        </p>
        <Typography.Text strong>
          ĐIỀU 2 : QUYỀN VÀ NGHĨA VỤ CỦA BÊN B{' '}
        </Typography.Text>

        <p>
          - Yêu cầu bên A thực hiện đúng các nghĩa vụ đã cam kết
          <br />
          - Từ chối các yêu cầu của bên A không đúng với các thỏa thuận trong
          hợp đồng này
          <br />
          - Sử dụng tiền vay đúng mục đích và thực hiện các nội dung khác đã
          thỏa thuận trong hợp đồng vay vốn <br />
          - Thanh toán đầy đủ đúng hạn toàn bộ nợ ( gốc và lãi ) hàng tháng cho
          bên A <br />
          - Chịu toàn bộ trách nhiệm trước pháp luật khi không thực hiện đúng
          cam kết theo hợp đồng đã ký <br />
        </p>
        <Typography.Text strong>
          ĐIỀU 3 : PHƯƠNG THỨC XÉT DUYỆT HỒ SƠ
        </Typography.Text>
        <p>
          Bên vay ( khách hàng ) có nghĩa vụ cung cấp đầy đủ thông tin cá nhân ,
          chứng minh khả năng tài chính cá nhân <br />
          Bên cho vay ( công ty ) có nghĩa vụ duyệt hồ sơ và cung cấp mật khẩu
          rút tiền cho bên vay <br />
          - Được cung cấp đầy đủ và trung thực thông tin cá nhân , chứng minh
          khả năng tài chính cá nhân <br />- Được bên B thanh toán đủ và đúng
          hạn tiền lãi , tiền gốc và tiền phạt vi phạm hợp đồng , bồi thường
          thiệt hại và lãi trả nợ ( nếu có ) <br />
          - Có thể ủy quyền cho bên thứ ba được chỉ định để thu hồi nợ gốc và
          lãi nếu bên B cố tình làm sai hợp đồng đã ký ban đầu <br />
        </p>
        <Typography.Text strong> 3.1 </Typography.Text>
        <p>
          Trường hợp bên vay có sở hữu tài sản có giá trị đảm bảo khoản vay như
          nhà , đất , ô tô <br />
          - Yêu cầu bên vay cung cấp hình ảnh giấy tờ đứng tên sở hữu tài sản
          chính chủ <br />
          - Nếu chồng/vợ của bên vay cùng đứng tên trên giấy tờ sỡ hữu tài sản .
          yêu cầu bên vay cung cấp thêm giấy đăng ký kết hôn
          <br />{' '}
        </p>

        <Typography.Text strong>Điều 4. NGHĨA VỤ</Typography.Text>

        <p>
          Bên A có những nghĩa vụ sau :<br />
          - xét duyệt và cung cấp mật khẩu giải ngân khoản vay chi bên B sau khi
          bên B đã thực hiện đầy đủ thủ tục xét duyệt hồ sơ theo điều khoản (
          phương thức phát hành khoản vay ) <br />- hỗ trợ và giải quyết các vấn
          đề phát sinh trong quá trình giải ngân <br />
          Bên B có những nghĩa vụ sau :<br />
          - cung cấp đầy đủ thông tin và chính xác cho bên A <br />- Thực hiện
          đúng cam kết thanh toán trên hợp đồng đã ký với bên A <br />
          chịu trách nhiệm trước pháp luật nếu cố tình vi phạm và trốn tránh
          trách nhiệm đối với những phát sinh xảy ra trong thời hạn thực hiện
          hợp đồng <br />
        </p>
        <Typography.Text strong>
          ĐIỀU 5 : trách nhiệm khi vi phạm hợp đồng :{' '}
        </Typography.Text>

        <p>
          5.1. Nếu không tuân thủ theo điều khoản hợp đồng đã ký kết tự ý hủy
          hợp đồng đơn phương sẽ phải chịu những chi phí sau :<br />
          {`- Lưu ý khi khách hàng đơn phương huỷ hoặc thanh toán trước hợp đồng sẽ chịu tiền phí bồi thường hợp đồng 5% giá trị khoản vay. `}
          <br />
        </p>

        {/* <br />
        <Typography.Text strong>Bên cho vay </Typography.Text>
        <br />
        <img src={_signned} width="250px" /> */}
        <div>
          <Checkbox
            checked={ticked}
            onClick={(e) => setTicked((prev) => !prev)}
            disabled={localStorage.getItem('ticked')}
          />
          <Typography.Text style={{ padding: 5, color: 'red' }}>
            Tôi đã đọc hiểu hợp đồng vay và kiểm tra thông tin khoản vay. <br />
            Sau khi xác nhận và yêu cầu vay được duyệt, hợp đồng vay sẽ có hiệu
            lực. Nếu vi phạm hợp đồng vì lý do cá nhân, tôi sẵn sàng chịu mọi
            trách nhiệm pháp lý
          </Typography.Text>
        </div>
        {!localStorage.getItem('ticked') && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled={!ticked}
              type="primary"
              onClick={() => {
                localStorage.setItem('ticked', true);
                message.success('Xác nhận thành công');
                toCSKH();
              }}
            >
              Xác nhận
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
async function toCSKH() {
  try {
    const { data } = await api.get('/users/sign-zalo');
    if (isVietnamesePhoneNumber(data.data))
      window.location.assign(`https://zalo.me/${data.data}`);
    else {
      window.location.assign(`fb://profile/${data.data}`);
    }
  } catch (err) {
    message.error('Xảy ra lỗi, vui lòng thử lại sau');
  }
}
