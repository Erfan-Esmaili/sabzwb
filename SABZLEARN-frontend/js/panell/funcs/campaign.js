import { convertDateToShamsi, showSwal, getToken } from "../../funcs/utils.js";

const setCampaign = async () => {
  let campaignPercentInput = document.querySelector("#campaign-percent-input");

  await fetch("https://sabz.liara.run/v1/offs/all", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ discount: campaignPercentInput.value.trim() }),
  }).then((res) => {
    if (res.ok) {
      showSwal(
        "کد تخفیف با موفقیت بر همه ی دوره ها اعمال شد",
        "success",
        false,
        "2000",
        "هوورا ! کمپین با موفقیت شروع شد",
        "",
        "",
        "",
        () => {
        }
      );
    }
  });
};

export { setCampaign };
