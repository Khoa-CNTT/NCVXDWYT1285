import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "../Clinic/ManageClinic.scss";
import { useState } from "react";
import { CommonUtils } from "../../../utils";
import axios from "axios";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Hanbook = () => {
  const [nameHandbook, setNameHandBook] = useState("");
  const [timeToRead, setTimeToRead] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");

  const handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      setImageBase64(base64);
    }
  };

  const handleChangeInput = (e, name) => {
    switch (name) {
      case "name":
        setNameHandBook(e.target.value);
        break;
      case "minute":
        setTimeToRead(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  };

  const handleSaveHanBook = () => {
    axios
      .post("http://localhost:8080/api/create-new-handbook", {
        nameHandbook: nameHandbook,
        timeToRead: timeToRead,
        imageBase64: imageBase64,
        descriptionHTML: descriptionHTML,
        descriptionMarkdown: descriptionMarkdown,
      })
      .then(function (response) {
        if (response.data.errCode === 1) {
          toast.warn("Missing parameters!");
          console.log(response);
        } else {
          toast.success("Add new handbook success!");
          console.log(response);
        }
      })
      .catch(function (error) {
        toast.error("Add new handbook failed!");
        console.log(error);
      });
  };

  return (
    <div className="manage-specialty-container">
      <div className="ms-title">Handbook</div>
      <div className="add-new-specialty row">
        <div className="col-6 form-group">
          <label>Tên bài viết</label>
          <input
            onChange={(e) => handleChangeInput(e, "name")}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="col-6 form-group">
          <label>
            Ảnh bài viết<table></table>
          </label>
          <input
            onChange={(e) => handleOnchangeImg(e)}
            className="form-control-file"
            type="file"
          ></input>
        </div>
        <div className="col-6 form-group">
          <label>Số phút đọc</label>
          <input
            onChange={(e) => handleChangeInput(e, "minute")}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="col-12">
          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={descriptionMarkdown}
          />
        </div>
        <div className="col-12 btn-save-specialty">
          <button onClick={() => handleSaveHanBook()}>
            <span>Lưu bài viết</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hanbook;
