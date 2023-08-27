import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Layout,
  Navbar,
  Label,
  Button,
  Input,
  Typography,
  Checkbox,
  FloatingLabelInput,
  Modal,
} from "@components";

import ImgHeroDonation from "@/assets/hero-donation.svg";
import ImgHeroVolunteer from "@/assets/hero-volunteer.svg";
import ImgHeroCommunity from "@/assets/hero-community.svg";
import IcCleanup from "@/assets/cleanup.svg";
import IcStreetfair from "@/assets/streetfair.svg";
import IcWorkshop from "@/assets/workshop.svg";
import IcGardenday from "@/assets/gardenday.svg";
import IcSprinkle from "@/assets/sprinkle1.svg";
import IcMaps from "@/assets/map.svg";
import IcDate from "@/assets/calendar.svg";
import IcDonate from "@/assets/donate.svg";
import IcCC from "@/assets/cc.svg";
import IcPaynow from "@/assets/paynow.svg";
import IcInfo from "@/assets/information.svg";
import IcClose from "@/assets/close.svg";

const TABS = [
  {
    id: 1,
    name: "View All",
  },
  {
    id: 2,
    name: "Food Delivery",
  },
  {
    id: 3,
    name: "Teaching",
  },
  {
    id: 4,
    name: "Event Organizer",
  },
  {
    id: 5,
    name: "Helper",
  },
];

const VOLUNTEERS = [
  {
    id: 1,
    tab_id: 2,
    category: "Food Delivery",
    category_color: "success",
    title: "Food From the Heart",
    description:
      "We’re looking for volunteers to deliver food to people in need.",
    location: "Bedok Place",
    date: "25/08/2023",
  },
  {
    id: 2,
    tab_id: 3,
    category: "Teaching",
    category_color: "info",
    title: "Angsana Orphanage",
    description:
      "We’re looking for volunteers to teach children from the age of 4-8 years old.",
    location: "Bedok Place",
    date: "25/08/2023",
  },
  {
    id: 3,
    tab_id: 4,
    category: "Helper",
    category_color: "warning",
    title: "Beacon of Hope Retirement",
    description: "We’re looking for volunteers to help in our retirement home.",
    location: "Bedok Place",
    date: "25/08/2023",
  },
  {
    id: 4,
    tab_id: 5,
    category: "Event Organizer",
    category_color: "danger",
    title: "Mental Health Community",
    description:
      "We’re planning to have our anniversary events and requires volunteers to help out. ",
    location: "Bedok Place",
    date: "25/08/2023",
  },
];

type FormData = {
  organization_name?: string;
  name: string;
  email: string;
  idType?: string;
  taxRecipientId?: string;
  taxRecipientFullName?: string;
  postalCode: number;
  address: string;
  unitNumber?: string;
  remarks?: string;
  amount: number;
  taxDeduction: boolean;
  donors: number;
  payment: number;
  agree: boolean;
};

const schema = yup.object({
  organization_name: yup.string().when("donors", {
    is: (donors: number) => donors === 2,
    then: (schema) => schema.required("Organization Name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  name: yup.string().when("donors", {
    is: (donors: number) => donors !== 3,
    then: (schema) => schema.required("Name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  email: yup.string().email("Invalid email").required("Email is required"),
  taxDeduction: yup.boolean(),
  idType: yup.string().when("taxDeduction", {
    is: true,
    then: (schema) => schema.required("ID Type is required"),
    otherwise: (schema) => schema.optional(),
  }),
  taxRecipientId: yup.string().when("taxDeduction", {
    is: true,
    then: (schema) =>
      schema
        .required("Tax Recipient ID is required")
        .when("idType", {
          is: "NRIC",
          then: (schema) =>
            schema
              .matches(/^[STFG]\d{7}[A-JZ]$/, "Invalid NRIC format")
              .typeError("Invalid NRIC format"),
        })
        .when("idType", {
          is: "UEN",
          then: (schema) =>
            schema
              .matches(
                /^[0-9]{8}[A-HJ-NP-Z]$/,
                "Invalid UEN format: 8 digits followed by a letter (excluding I, O, U)",
              )
              .typeError(
                "Invalid UEN format: 8 digits followed by a letter (excluding I, O, U)",
              ),
        }),
    otherwise: (schema) => schema.optional(),
  }),
  taxRecipientFullName: yup.string().when("taxDeduction", {
    is: true,
    then: (schema) => schema.required("Tax Recipient Full Name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  postalCode: yup.string().when("donors", {
    is: (donors: number) => donors !== 3,
    then: (schema) => schema.required("Postal Code is required").min(6).max(6),
    otherwise: (schema) => schema.optional(),
  }),
  address: yup.string().when("donors", {
    is: (donors: number) => donors !== 3,
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.optional(),
  }),
  unitNumber: yup.string().when("donors", {
    is: (donors: number) => donors !== 3,
    then: (schema) =>
      schema
        .required("Unit Number is required")
        .matches(
          /^[\d-]+$/,
          "Unit Number must only contain numbers and hyphens",
        )
        .typeError("Unit Number must only contain numbers and hyphens"),
    otherwise: (schema) => schema.optional(),
  }),
  remarks: yup.string().optional(),
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  agree: yup.boolean().required(),
  payment: yup.number().required(),
});

const Home: React.FC = () => {
  // states
  const [activeTab, setActiveTab] = useState<number>(1);
  const [checkedDonors, setCheckedDonors] = useState<number>(1);
  const [isTaxDeduction, setTaxDeduction] = useState<boolean>(true);
  const [payment, setPayment] = useState<number>();
  const [isAgree, setAgree] = useState<boolean>(false);
  const [isAgreementModalOpen, setAgreementModalOpen] = useState(false);

  // hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    localStorage.setItem("temporaryData", JSON.stringify(data));
    return navigate("/success");
  };

  // functions
  const handleCheckboxChange = (donorsId: number) => {
    setValue("donors", donorsId);
    setValue("idType", "UEN");
    setCheckedDonors(donorsId);
  };
  const handleTaxDeductionChange = (checked: boolean) => {
    setValue("taxDeduction", checked);
    setTaxDeduction(checked);
  };
  const handleSetActiveTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  const handleChangePayment = (paymentId: number) => {
    setValue("payment", paymentId);
    setPayment(paymentId);
  };
  const openModalAgreement = () => {
    setAgreementModalOpen(true);
  };
  const closeModalAgreement = () => {
    setAgreementModalOpen(false);
  };
  const handleAgreement = () => {
    setAgree(true);
    setValue("agree", true);
    setAgreementModalOpen(false);
  };
  const filteredVolunteers =
    activeTab !== 1
      ? VOLUNTEERS.filter((item) => item.tab_id === activeTab)
      : VOLUNTEERS;

  // effects
  useEffect(() => {
    // Set default values
    setValue("taxDeduction", true);
    setValue("donors", 1);
  }, []);

  return (
    <Layout>
      <div className="gradient-primary-600-500 text-white h-auto pb-24">
        <Navbar />
        <section className="mx-auto container">
          <div className="py-5 flex justify-center flex-col items-center gap-y-5 mt-24">
            <Label variant="warning">START HELPING</Label>
            <Typography className="text-center" variant="h3" size="semibold">
              We provide ways for you to help
            </Typography>
            <Typography
              className="text-center"
              variant="subtitle-1"
              size="regular">
              There are numerous ways to contribute to your community beyond{" "}
              <br />
              just donating money or volunteering your time
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 md:hover:grid-cols-4 gap-5 mt-5">
            <div className="group relative border h-52 p-8 rounded-lg bg-primary-500 border-primary-400 justify-between flex hover:col-span-2 col-span-1">
              <div className="flex flex-col">
                <Typography variant="subtitle-1" size="semibold">
                  Donation
                </Typography>
                <Typography
                  variant="body-1"
                  size="regular"
                  className="opacity-0 top-0 left-0 w-full h-full group-hover:opacity-100 mt-4">
                  Giving money, goods, or resources to <br /> support causes,
                  organizations, or <br /> individuals in need.
                </Typography>
              </div>
              <img
                src={ImgHeroDonation}
                alt="Donation"
                className="absolute bottom-5 right-2"
              />
            </div>
            <div className="group relative border h-52 p-8 rounded-lg bg-primary-500 border-primary-400 justify-between flex hover:col-span-2 col-span-1">
              <div className="flex flex-col">
                <Typography variant="subtitle-1" size="semibold">
                  Volunteer
                </Typography>
                <Typography
                  variant="body-1"
                  size="regular"
                  className="opacity-0 top-0 left-0 w-full h-full group-hover:opacity-100 mt-4">
                  Offering time and effort willingly, without <br /> pay, to
                  assist and contribute to <br /> community or charitable
                  activities.
                </Typography>
              </div>
              <img
                src={ImgHeroVolunteer}
                alt="Donation"
                className="absolute bottom-5 right-2"
              />
            </div>
            <div className="group relative border h-52 p-8 rounded-lg bg-primary-500 border-primary-400 justify-between flex hover:col-span-2 col-span-1">
              <div className="flex flex-col">
                <Typography variant="subtitle-1" size="semibold">
                  Community Events
                </Typography>
                <Typography
                  variant="body-1"
                  size="regular"
                  className="opacity-0 top-0 left-0 w-full h-full group-hover:opacity-100 mt-4">
                  Gatherings organized to engage and <br /> connect residents,
                  fostering a sense of <br /> unity and shared experiences.
                </Typography>
              </div>
              <img
                src={ImgHeroCommunity}
                alt="Donation"
                className="absolute bottom-5 right-2"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="py-20 mx-auto container">
        <div>
          <Typography
            variant="body-1"
            size="semibold"
            className="text-primary-500 mb-3">
            Donation
          </Typography>
          <Typography
            variant="h4"
            size="semibold"
            className="text-neutral-900 mb-5 flex flex-row gap-x-4">
            Giving back to the community
            <img src={IcSprinkle} alt="Giving back to the community" />
          </Typography>
          <Typography
            variant="subtitle-1"
            size="regular"
            className="text-neutral-500">
            Giving money, goods, or resources to support causes, organizations,
            or <br /> individuals in need.
          </Typography>
        </div>
        <div className="bg-neutral-50 rounded-2xl py-8 md:px-[104px] my-10">
          <div className="border-b border-neutral-200 pb-4">
            <Typography
              variant="subtitle-1"
              size="semibold"
              className="text-neutral-900">
              Let us know about you
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 my-6 gap-4">
            <Checkbox
              label="Donate as an Individual"
              subLabel="Provide my personal data"
              checked={checkedDonors === 1}
              onChange={() => handleCheckboxChange(1)}
              card
            />
            <Checkbox
              label="Donate as an Organisation"
              subLabel="Provide organisation data"
              checked={checkedDonors === 2}
              onChange={() => handleCheckboxChange(2)}
              card
            />
            <Checkbox
              label="Donate Anonymously"
              subLabel="Optionally provide data"
              checked={checkedDonors === 3}
              onChange={() => handleCheckboxChange(3)}
              card
            />
          </div>
          <div className="border-b border-neutral-200 pb-4 mt-4">
            <Typography
              variant="subtitle-1"
              size="semibold"
              className="text-neutral-900">
              Let’s complete your information details
            </Typography>
          </div>
          <div className="my-6">
            <Checkbox
              label="I wish to have tax deduction"
              subLabel="You are entitled to a tax-deduction of 2.5 times of your donation amount"
              checked={isTaxDeduction}
              onChange={() => handleTaxDeductionChange(!isTaxDeduction)}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-4">
              {checkedDonors === 2 && (
                <div>
                  <FloatingLabelInput
                    label="Organization Name"
                    register={register("organization_name")}
                    error={errors.organization_name?.message}
                  />
                </div>
              )}
              {checkedDonors !== 3 && (
                <div>
                  <FloatingLabelInput
                    label="Name"
                    register={register("name")}
                    error={errors.name?.message}
                  />
                </div>
              )}
              <div>
                <FloatingLabelInput
                  label="Email"
                  register={register("email")}
                  error={errors.email?.message}
                />
              </div>
              <div className="flex flex-row gap-x-4">
                <div className="w-1/2">
                  <div>
                    <select
                      disabled={!isTaxDeduction}
                      {...register("idType")}
                      className={`border w-full rounded-xl px-3 h-[52px] ${
                        errors.idType ? "border-danger-600" : ""
                      }`}>
                      <option value="" selected={!isTaxDeduction}>
                        ID Type
                      </option>
                      <option value="NRIC" selected={checkedDonors === 1}>
                        NRIC
                      </option>
                      <option value="UEN" selected={checkedDonors === 2}>
                        UEN
                      </option>
                    </select>
                  </div>
                  {errors.idType && (
                    <Typography
                      className="text-danger-600 mt-2"
                      variant="body-2"
                      size="regular">
                      {errors.idType.message}
                    </Typography>
                  )}
                </div>
                <div className="w-full">
                  <FloatingLabelInput
                    label="Tax Recipient ID"
                    register={register("taxRecipientId")}
                    disabled={!isTaxDeduction}
                    error={errors.taxRecipientId?.message}
                  />
                </div>
              </div>
              <div>
                <FloatingLabelInput
                  label="Tax Recipient Full Name"
                  register={register("taxRecipientFullName")}
                  disabled={!isTaxDeduction}
                  error={errors.taxRecipientFullName?.message}
                />
              </div>
              {checkedDonors !== 3 && (
                <>
                  <div>
                    <FloatingLabelInput
                      label="Postal Code"
                      register={register("postalCode")}
                      error={errors.postalCode?.message}
                    />
                  </div>
                  <div>
                    <FloatingLabelInput
                      label="Address"
                      register={register("address")}
                      error={errors.address?.message}
                    />
                  </div>
                  <div>
                    <FloatingLabelInput
                      label="Unit Number"
                      register={register("unitNumber")}
                      error={errors.unitNumber?.message}
                    />
                  </div>
                </>
              )}
              <div>
                <FloatingLabelInput
                  label="Remarks"
                  register={register("remarks")}
                  error={errors.remarks?.message}
                />
              </div>
            </div>

            <div className="border-b border-neutral-200 pb-4 my-8">
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                How much would you like to donate?
              </Typography>
            </div>

            <div className="flex flex-col md:w-1/3 mx-auto justify-center">
              <div className="my-2">
                <FloatingLabelInput
                  label="Donation Amount S$"
                  register={register("amount")}
                  error={errors.amount?.message}
                />
              </div>

              <div
                className={`grid grid-cols-2 my-3 gap-4 ${
                  errors.payment
                    ? "border-danger-500 border p-2 rounded-xl"
                    : ""
                }`}>
                <div
                  onClick={() => handleChangePayment(1)}
                  className={`border-2 p-4 rounded-xl bg-white flex flex-row items-center gap-x-2 cursor-pointer ${
                    payment === 1
                      ? "border-secondary-500"
                      : "border-neutral-300"
                  }`}>
                  <img src={IcCC} alt="Credit Card" />
                  <Typography
                    variant="body-2"
                    size="semibold"
                    className="text-neutral-800">
                    Credit Card
                  </Typography>
                </div>
                <div
                  onClick={() => handleChangePayment(2)}
                  className={`border-2 p-4 rounded-xl bg-white flex flex-row items-center gap-x-2 cursor-pointer ${
                    payment === 2
                      ? "border-secondary-500"
                      : "border-neutral-300"
                  }`}>
                  <img src={IcPaynow} alt="Paynow" />
                  <Typography
                    variant="body-2"
                    size="semibold"
                    className="text-neutral-800">
                    PayNow
                  </Typography>
                </div>
              </div>

              {errors.payment && (
                <Typography
                  className="text-danger-600 text-center"
                  variant="body-2"
                  size="regular">
                  {errors.payment.message}
                </Typography>
              )}

              <div className="mt-4">
                <label
                  className="flex flex-row gap-x-2 cursor-pointer"
                  onClick={openModalAgreement}>
                  <Checkbox
                    label={
                      <Typography
                        variant="body-1"
                        size="medium"
                        className="text-neutral-700">
                        I agree with the{" "}
                        <span className="text-info-500">
                          terms and conditions
                        </span>
                      </Typography>
                    }
                    checked={isAgree}
                    onChange={() => null}
                  />
                </label>
              </div>

              <Modal
                isOpen={isAgreementModalOpen}
                onClose={closeModalAgreement}>
                <div className="flex flex-row justify-between p-5 flex-1">
                  <div className="flex flex-row gap-x-4">
                    <img src={IcInfo} alt="information" />
                    <div>
                      <Typography
                        variant="subtitle-2"
                        size="semibold"
                        className="text-neutral-900">
                        Terms and Conditions
                      </Typography>
                      <Typography
                        variant="body-2"
                        size="regular"
                        className="text-neutral-500">
                        Last updated: 20 October 2022{" "}
                      </Typography>
                    </div>
                  </div>
                  <img
                    src={IcClose}
                    alt="close"
                    onClick={closeModalAgreement}
                    className="cursor-pointer"
                  />
                </div>
                <div className="px-5">
                  <Typography
                    size="regular"
                    variant="body-1"
                    className="text-neutral-700">
                    Company Name operates the Website Name website, which
                    provides the SERVICE. This page is used to inform website
                    visitors regarding our policies with the collection, use,
                    and disclosure of Personal Information if anyone decided to
                    use our Service, the Website Name website. If you choose to
                    use our Service, then you agree to the collection and use of
                    information in relation with this policy. The Personal
                    Information that we collect are used for providing and
                    improving the Service. We will not use or share your
                    information with anyone except as described in this Privacy
                    Policy. The terms used in this Privacy Policy have the same
                    meanings as in our Terms and Conditions, which is accessible
                    at Website URL, unless otherwise defined in this Privacy
                    Policy. Information Collection and Use For a better
                    experience while using our Service, we may require you to
                    provide us with certain personally identifiable information,
                    including but not limited to your name, phone number, and
                    postal address. The information that we collect will be used
                    to contact or identify you. Log Data We want to inform you
                    that whenever you visit our Service, we collect information
                    that your browser sends to us that is called Log Data. This
                    Log Data may include information such as your computer's
                    Internet Protocol (“IP”) address, browser version, pages of
                    our Service that you visit, the time and date of your visit,
                    the time spent on those pages, and other statistics. Cookies
                    Cookies are files with small amount of data that is commonly
                    used an anonymous unique identifier. These are sent to your
                    browser from the website that you visit and are stored on
                    your computer's hard drive. Our website uses these “cookies”
                    to collection information and to improve our Service. You
                    have the option to either accept or refuse these cookies,
                    and know when a cookie is being sent to your computer. If
                    you choose to refuse our cookies, you may not be able to use
                    some portions of our Service. Service Providers We may
                    employ third-party companies and individuals due to the
                    following reasons: To facilitate our Service; To provide the
                    Service on our behalf; To perform Service-related services;
                    or To assist us in analyzing how our Service is used. We
                    want to inform our Service users that these third parties
                    have access to your Personal Information. The reason is to
                    perform the tasks assigned to them on our behalf. However,
                    they are obligated not to disclose or use the information
                    for any other purpose. Security We value your trust in
                    providing us your Personal Information, thus we are striving
                    to use commercially acceptable means of protecting it. But
                    remember that no method of transmission over the internet,
                    or method of electronic storage is 100% secure and reliable,
                    and we cannot guarantee its absolute security. Links to
                    Other Sites Our Service may contain links to other sites. If
                    you click on a third-party link, you will be directed to
                    that site. Note that these external sites are not operated
                    by us. Therefore, we strongly advise you to review the
                    Privacy Policy of these websites. We have no control over,
                    and assume no responsibility for the content, privacy
                    policies, or practices of any third-party sites or services.
                    Children's Privacy Our Services do not address anyone under
                    the age of 13. We do not knowingly collect personal
                    identifiable information from children under 13. In the case
                    we discover that a child under 13 has provided us with
                    personal information, we immediately delete this from our
                    servers. If you are a parent or guardian and you are aware
                    that your child has provided us with personal information,
                    please contact us so that we will be able to do necessary
                    actions. Changes to This Privacy Policy We may update our
                    Privacy Policy from time to time. Thus, we advise you to
                    review this page periodically for any changes. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page. These changes are effective immediately, after
                    they are posted on this page. Contact Us If you have any
                    questions or suggestions about our Privacy Policy, do not
                    hesitate to contact us.
                  </Typography>
                </div>
                <div className="border-t border-neutral-200 mt-5 p-5 flex justify-end gap-x-4">
                  <Button
                    variant="white"
                    type="button"
                    className="border"
                    onClick={closeModalAgreement}>
                    Close
                  </Button>
                  <Button type="button" onClick={handleAgreement}>
                    I Agree
                  </Button>
                </div>
              </Modal>
            </div>

            <div className="flex justify-center my-10">
              <Button
                type="submit"
                disabled={!isAgree}
                variant={"default"}
                size={"2xl"}
                className="gap-x-2 px-8">
                Donate
                <img src={IcDonate} alt="Donate" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-20 mx-auto container">
        <div className="text-center">
          <Typography
            variant="body-1"
            size="semibold"
            className="text-primary-500 mb-3">
            Volunteer
          </Typography>
          <Typography
            variant="h4"
            size="semibold"
            className="text-neutral-900 mb-5">
            Assist the community
          </Typography>
          <Typography
            variant="subtitle-1"
            size="regular"
            className="text-neutral-500">
            Offering time and effort willingly, without pay, to <br /> assist
            and contribute to community or charitable activities.
          </Typography>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center my-10">
          {TABS?.map((tab) => (
            <Button
              key={`tab-${tab.id}`}
              onClick={() => handleSetActiveTab(tab.id)}
              variant={activeTab === tab.id ? "info" : "white"}>
              {tab.name}
            </Button>
          ))}
        </div>
        <div className="md:mx-52">
          {filteredVolunteers.map((volunteer) => (
            <div
              key={`volunteer-${volunteer.id}`}
              className="border rounded-2xl p-6 border-neutral-300 mb-6">
              <div className="flex flex-row justify-between">
                <Label variant={volunteer?.category_color} size={"sm"}>
                  {volunteer.category}
                </Label>
                <Button href="/#" variant={"link"}>
                  View Opportunity
                </Button>
              </div>
              <div className="my-5">
                <Typography
                  variant="subtitle-2"
                  size="semibold"
                  className="text-neutral-900 mb-4">
                  {volunteer.title}
                </Typography>
                <Typography
                  variant="body-1"
                  size="regular"
                  className="text-neutral-500 mb-4">
                  {volunteer.description}
                </Typography>
                <div className="flex flex-row gap-x-8 items-center">
                  <div className="flex flex-row gap-x-2 items-center">
                    <img src={IcMaps} alt="maps" />
                    <Typography
                      variant="body-1"
                      size="regular"
                      className="text-neutral-500">
                      {volunteer.location}
                    </Typography>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center">
                    <img src={IcDate} alt="date" />
                    <Typography
                      variant="body-1"
                      size="regular"
                      className="text-neutral-500">
                      {volunteer.date}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 py-20 mx-auto container">
        <div>
          <Typography
            variant="body-1"
            size="semibold"
            className="text-primary-500 mb-3">
            Community Events
          </Typography>
          <Typography
            variant="h4"
            size="semibold"
            className="text-neutral-900 mb-5">
            Engage with the community
          </Typography>
          <Typography
            variant="subtitle-1"
            size="regular"
            className="text-neutral-500">
            Gatherings organized to engage and connect residents, fostering a
            sense of unity and shared experiences.
          </Typography>
        </div>
        <div className="grid md:grid-cols-4 gap-8 my-10">
          <div className="border rounded-2xl p-4 flex flex-col justify-between h-[270px]">
            <img src={IcCleanup} alt="cleanup" className="h-20 w-20" />
            <div>
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                Clean-up Day
              </Typography>
              <Typography
                variant="body-1"
                size="regular"
                className="text-neutral-600 mt-2">
                Bi-weekly
              </Typography>
              <Button href="/#" variant={"link"} className="mt-6">
                Read More
              </Button>
            </div>
          </div>
          <div className="border rounded-2xl p-4 flex flex-col justify-between h-[270px]">
            <img src={IcStreetfair} alt="street fair" className="h-20 w-20" />
            <div>
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                Street Fair
              </Typography>
              <Typography
                variant="body-1"
                size="regular"
                className="text-neutral-600 mt-2">
                Monthly
              </Typography>
              <Button href="/#" variant={"link"} className="mt-6">
                Read More
              </Button>
            </div>
          </div>
          <div className="border rounded-2xl p-4 flex flex-col justify-between h-[270px]">
            <img src={IcWorkshop} alt="cleanup" className="h-20 w-20" />
            <div>
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                Workshops
              </Typography>
              <Typography
                variant="body-1"
                size="regular"
                className="text-neutral-600 mt-2">
                Weekly
              </Typography>
              <Button href="/#" variant={"link"} className="mt-6">
                Read More
              </Button>
            </div>
          </div>
          <div className="border rounded-2xl p-4 flex flex-col justify-between h-[270px]">
            <img src={IcGardenday} alt="cleanup" className="h-20 w-20" />
            <div>
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                Garden Day
              </Typography>
              <Typography
                variant="body-1"
                size="regular"
                className="text-neutral-600 mt-2">
                Monthly
              </Typography>
              <Button href="/#" variant={"link"} className="mt-6">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 h-[212px] mx-auto container flex flex-col md:flex-row justify-between items-center px-12 my-24 rounded-xl">
        <div className="space-y-2">
          <Typography variant="h5" size="semibold" className="text-neutral-900">
            Keep up to date with our newsletter
          </Typography>
          <Typography
            variant="subtitle-1"
            size="regular"
            className="text-xl font-normal text-neutral-500">
            Stay in the loop for everything you need to know
          </Typography>
        </div>
        <div className="flex flex-row gap-x-4">
          <Input className="w-52" type="text" placeholder="Email Address" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
