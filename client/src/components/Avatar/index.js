import React, { useState, useEffect } from "react";
import { Avatar, Button, Row, Col } from "antd";
import { UserOutlined, EditTwoTone } from "@ant-design/icons";
import { SketchPicker } from "react-color";

const UserAvatar = () => {
  const storedColor = localStorage.getItem("avatarColor") || "#1890ff";
  const [avatarColor, setAvatarColor] = useState(storedColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color) => {
    setAvatarColor(color.hex);
  };

  const handleColorPickerVisible = () => {
    setShowColorPicker((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("avatarColor", avatarColor);
  }, [avatarColor]);

  return (
    <div>
      <Row justify="center" gutter={[16, 16]}>
        <div style={{ position: "relative" }}>
          <Col>
            <Avatar
              size={120}
              style={{ backgroundColor: avatarColor }}
              icon={
                <UserOutlined
                  style={{ fontSize: 70, color: "white", cursor: "pointer" }}
                />
              }
            />
          </Col>
          <Col>
            <Button
              onClick={handleColorPickerVisible}
              style={{ position: "absolute", top: -130, left: -25 }}>
              <EditTwoTone />
            </Button>
          </Col>
        </div>
      </Row>
      {showColorPicker && (
        <Row justify="center">
          <Col style={{ position: "relative" }}>
            {showColorPicker && (
              <div style={{ position: "absolute", zIndex: 1 }}>
                <SketchPicker
                  color={avatarColor}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserAvatar;
