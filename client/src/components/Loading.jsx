/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import axios from "axios";

function Loading({ width }) {
  const [animationLoading, setAnimationLoading] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://lottie.host/b246acf6-ae55-4d15-a0bf-59f6ef332de6/yNrnanM1in.json"
      )
      .then((response) => {
        setAnimationLoading(response.data);
      })
      .catch((error) => {
        console.error("Error fetching animation", error);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center justify-self-center content-center self-center place-content-center place-items-center place-self-center">
      {animationLoading && (
        <Lottie options={defaultOptions} width={250} />
      )}
    </div>
  );
}

export default Loading;
