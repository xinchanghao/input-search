import React from "react";

const ResultItem = (props) => {
  const { item, isSelected, isHighlighted, style, children, ...rest } = props;

  const mergedStyles = {
    ...style,
    ...{
      display: "flex",
      padding: 15,
      color: "#000",
      textAlign: "left",
      borderLeft: "1px solid #e1e1e1",
      borderRight: "1px solid #e1e1e1",
      borderBottom: "1px solid #e1e1e1",
    },
  };

  if (isSelected) {
    mergedStyles.backgroundColor = "#f8f8f8";
  }

  if (isHighlighted) {
    mergedStyles.backgroundColor = "#e1e1e1";
  }

  return (
    <div style={mergedStyles} {...rest}>
      <a
        href={item.url}
        style={{
          display: "flex",
          width: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {item.image && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 30,
              marginRight: 15,
            }}
          >
            <img src={item.image} width={30} height={30} alt="" />
          </div>
        )}
        <div style={{ flexGrow: 1 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: "bold",
              lineHeight: 2,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {item.title}
          </h2>
          <h3
            style={{
              color: "#bbb",
              fontSize: 11,
              lineHeight: 1,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {item.subtitle}
          </h3>
        </div>
      </a>
    </div>
  );
};

export default ResultItem;
