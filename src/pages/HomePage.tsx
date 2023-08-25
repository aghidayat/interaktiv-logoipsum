import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Layout,
  Navbar,
  Label,
  Button,
  Input,
  Typography,
  Checkbox,
  FloatingLabelInput,
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
  name: string;
  email: string;
  idType?: string;
  taxRecipientId?: string;
  taxRecipientFullName?: string;
  postalCode?: string;
  address?: string;
  unitNumber?: string;
  remarks?: string;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

const Home: React.FC = () => {
  // states
  const [activeTab, setActiveTab] = useState<number>(1);
  const [checkedDonors, setCheckedDonors] = useState<number>(1);
  const [isTaxDeduction, setTaxDeduction] = useState<boolean>(true);

  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  // functions
  const handleCheckboxChange = (donorsId: number) => {
    setCheckedDonors(donorsId);
  };
  const handleTaxDeductionChange = (checked: boolean) => {
    setTaxDeduction(checked);
  };
  const handleSetActiveTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  const filteredVolunteers =
    activeTab !== 1
      ? VOLUNTEERS.filter((item) => item.tab_id === activeTab)
      : VOLUNTEERS;

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
          <div className="grid grid-cols-3 hover:grid-cols-4 gap-5 mt-5">
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
        <div className="bg-neutral-50 rounded-2xl py-8 px-[104px] my-10">
          <div className="border-b border-neutral-200 pb-4">
            <Typography
              variant="subtitle-1"
              size="semibold"
              className="text-neutral-900">
              Let us know about you
            </Typography>
          </div>
          <div className="grid grid-cols-3 my-6 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FloatingLabelInput label="Name" register={register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <FloatingLabelInput
                  label="Email"
                  register={register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-row gap-x-4">
                <div className="w-1/3">
                  <select
                    name=""
                    id=""
                    className="border w-full h-full rounded-xl">
                    <option value="">ID Type</option>
                  </select>
                </div>
                <div className="w-full">
                  <FloatingLabelInput
                    label="Tax Recipient ID"
                    register={register("taxRecipientId")}
                  />
                  {errors.taxRecipientId && (
                    <p className="text-red-500 text-sm">
                      {errors.taxRecipientId.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <FloatingLabelInput
                  label="Tax Recipient Full Name"
                  register={register("taxRecipientFullName")}
                />
                {errors.taxRecipientFullName && (
                  <p className="text-red-500 text-sm">
                    {errors.taxRecipientFullName.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingLabelInput
                  label="Postal Code"
                  register={register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingLabelInput
                  label="Address"
                  register={register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingLabelInput
                  label="Unit Number"
                  register={register("unitNumber")}
                />
                {errors.unitNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.unitNumber.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingLabelInput
                  label="Remarks"
                  register={register("remarks")}
                />
                {errors.remarks && (
                  <p className="text-red-500 text-sm">
                    {errors.remarks.message}
                  </p>
                )}
              </div>
            </div>

            <div className="border-b border-neutral-200 pb-4 mt-4">
              <Typography
                variant="subtitle-1"
                size="semibold"
                className="text-neutral-900">
                How much would you like to donate?
              </Typography>
            </div>

            <div className="flex justify-center my-10">
              <Button
                type="submit"
                variant={"default"}
                size={"2xl"}
                className="gap-x-2">
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
        <div className="grid grid-cols-4 gap-8 my-10">
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

      <section className="bg-neutral-100 h-[212px] mx-auto container flex flex-row justify-between items-center px-12 my-24 rounded-xl">
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
