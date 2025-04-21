import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { AccordionItem } from "../../../components/Accordion/AccordionItem";
import BenhVienHoanMy from "../../../assets/benh-vien-hoan-my.jpg";
import "./Instruct.scss";

const faqs = [
  {
    id: 1,
    header: "Quy trình làm thủ tục khám",
    text: ` <p style="text-align: justify;">
              Dưới đây là hướng đẫn đường đi và làm thủ tục khám tại Bệnh viện Hoàn Mỹ đối với người bệnh đã đặt
              khám thông qua HealthCare.
            </p>
            <p style="text-align: justify;">
              1. Bạn đến bệnh viện tại số 291 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng
            </p>
            <ul style="text-align: justify;">
              <li>Nếu đi xe máy: Bạn gửi tại trước cửa bệnh viện (có nhân viên bảo vệ hướng dẫn)</li>
              <li>Nếu đi ô tô: Bạn vui lòng hỏi nhân viên bảo vệ để được hướng dẫn nơi gửi xe ô tô</li>
            </ul>
            <p style="text-align: justify;"><img style="display: block; margin-left: auto; margin-right: auto; width: 622px; height: 458px;" src=${BenhVienHoanMy} alt="benh vien hoan my" /></p>
            <p style="text-align: justify;">
              2. Bạn vào quầy lễ tân tầng 1, báo <strong>đã đặt khám qua HealthCare</strong> và
              <strong>đưa mã QR</strong> (Mã trong hướng dẫn đi khám) cho nhân viên để được quét mã làm thủ tục khám.
            </p>`,
  },
  {
    id: 2,
    header: "Chuẩn bị trước khám",
    text: `<p>Bạn vui lòng lưu ý: <br/>1. Bạn nhớ mang theo hồ sơ khám cũ trong vòng 6 tháng (nếu có).<br/>2. Nên mặc quần áo rộng rãi, thoải mái, không nên mặc quần áo bó chật hoặc váy liền thân.<br/>3. Nên chuẩn bị trước một số câu hỏi để hỏi bác sĩ trong khi đi khám.</p>`,
  },
  {
    id: 3,
    header: " Trong khi đi khám",
    text: `<p>Bạn nên dùng một số câu hỏi đã chuẩn bị trước, hãy hỏi lại trực tiếp bác sĩ hoặc nhân viên y tế để được giải đáp, hỗ trợ các vấn đề chưa rõ (nếu có).</p>`,
  },
  {
    id: 4,
    header: "Sau khi đi khám",
    text: `<p>1. Bạn nên tuân thủ theo dặn dò của bác sĩ. <br/>2. Chúng tôi mong muốn được hỗ bạn tốt hơn nữa, vui lòng chia sẻ trải nghiệm đi khám của mình với BookingCare.</p><p>Cùng tham gia nhóm cộng đồng Review Bệnh viện - Phòng khám - Bác sĩ giỏi để lắng nghe và chia sẻ những câu chuyện đi khám thực tế.</p>`,
  },
  {
    id: 5,
    header: "Câu hỏi tham khảo",
    text: `<p>Bạn có thể tham khảo một số câu hỏi quan trọng.<br/>1. Nguyên nhân gây bệnh hoặc tình trạng của tôi là gì?<br/>2. Bệnh hoặc tình trạng này sẽ kéo dài trong bao lâu và diễn biến thế nào?<br/>3. Khả năng điều trị khỏi? <br/>4. Các phương pháp điều trị bệnh, tình trạng này là gì?<br/>5. Tôi cần tái khám không, trong thời gian bao lâu<br/>6. Ưu, nhược điểm của mỗi giải pháp điều trị là gì?<br/>7. Tôi có được Bảo hiểm y tế chi trả không, mức chi trả bao nhiêu.<br/>8. Các phương pháp hỗ trợ điều trị là gì (chế độ dinh dưỡng, nghỉ ngơi, tập luyện...)?</p>`,
  },
];

class InstructPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: [],
    };
  }

  async componentDidMount() {
    this.setState({
      active: [1],
    });
  }

  async componentDidUpdate() {}

  handleToggle = (index) => {
    const { active } = this.state;
    if (active.indexOf(index) !== -1) {
      this.setState({
        active: active.filter((item) => item !== index),
      });
    } else {
      this.setState({
        active: [...active, index],
      });
    }
  };

  render() {
    const { language } = this.props;
    const { data } = this?.props?.history?.location?.state;

    return (
      <main className="guide">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.116612112646!2d108.20983539999999!3d16.0594374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5975f39a7%3A0x9c707018713f82ee!2zQuG7h25oIHZp4buHbiBIb8OgbiBN4bu5IMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1734413381305!5m2!1svi!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <a
            class="btn-google-map"
            target="_blank"
            href="https://maps.app.goo.gl/7c8cPock5pWcQuag9"
          >
            Mở bằng Google Map
          </a>
        </div>
        <div className="container">
          <h1>Hướng dẫn đi khám</h1>
          <div className="guide-content">
            <div class="guide-info" data-testid="appointment-guide-information">
              <ul>
                <li>
                  Bác sĩ: {data?.doctorData?.firstName}{" "}
                  {data?.doctorData?.lastName}
                </li>
                <li>
                  Thời gian::&nbsp;
                  {language === LANGUAGES.VI
                    ? data?.timeTypeDataPatient?.valueVi
                    : data?.timeTypeDataPatient?.valueEn}
                  :&nbsp; Ngày {moment(+data?.date).format("DD/MM/YYYY")}
                </li>
                <li>Bệnh viện Hoàn Mỹ</li>
                <li>291 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng</li>
              </ul>
            </div>
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  key={index}
                  active={this.state.active}
                  handleToggle={this.handleToggle}
                  faq={faq}
                />
              );
            })}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructPage);
