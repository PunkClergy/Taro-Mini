/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http";
export const API_ROOT = "https://toy-mini.playalot.cn";

export const getToys = (postData) => {
  return HTTPREQUEST.get(`${API_ROOT}/v1/toys`, postData);
};
