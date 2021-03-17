import React from "react";
import PropTypes from "prop-types";

function Logo(props) {
  const [url, setUrl] = React.useState();

  React.useEffect(() => {
    async function getDownloadUrl() {
      setUrl(
        await props.storageRef
          .child(props.logo.timestamp.toString())
          .getDownloadURL()
      );
    }

    getDownloadUrl();
  }, [props.logo, props.storageRef]);

  return (
    <img
      style={{
        width: `${props.size}vw`,
        height: `${props.size}vh`,
      }}
      className="logo"
      crossOrigin="anonymous"
      src={url}
      alt="Logo"
    />
  );
}

Logo.propTypes = {
  logo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  storageRef: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
};

export default Logo;
