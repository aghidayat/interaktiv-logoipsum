import React from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import { Button, Input, Label, Layout, Typography } from "@components";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/Button";
import IcLogo from "@assets/logo-dark.svg";
import IcDownload from "@assets/download.svg";

const SuccessPage: React.FC = () => {
  const temporaryData: string | null = localStorage.getItem("temporaryData");
  const parsedTemporaryData = JSON.parse(temporaryData);
  const {
    name,
    email,
    postalCode,
    unitNumber,
    address,
    remarks,
    taxDeduction,
    donors,
    taxRecipientFullName,
    idType,
    taxRecipientId,
    payment,
  } = parsedTemporaryData;

  const handleDownload = () => {
    alert("download");
  };

  return (
    <Layout>
      <nav className="p-4 border-b border-neutral-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-row gap-x-10 items-center">
            <div className="text-white font-semibold text-lg">
              <Link to="/">
                <img src={IcLogo} alt="Logoipsum InterAktiv Technology" />
              </Link>
            </div>
          </div>
          <div className="gap-x-4 flex flex-row">
            <Link to="/">
              <Button variant={"white"} className="border">
                Return to Homescreen
              </Button>
            </Link>
            <Link to="/">
              <Button className={buttonVariants({ variant: "default" })}>
                Donate Again
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <section className="container mx-auto mt-12 my-5 w-1/2">
        <div className="gradient-primary-600-500 text-white px-12 py-16 rounded-2xl">
          <Typography variant="h3" size="semibold">
            Thank you for your <br /> donation!
          </Typography>
        </div>
        <div className="border rounded-2xl bg-white p-5 my-5">
          <div className="border-b border-neutral-200 pb-4 flex justify-between">
            <div>
              <Typography
                className="text-neutral-500"
                variant="body-2"
                size="regular">
                Donation No.
              </Typography>
              <div className="flex flex-row gap-x-2 items-center">
                <Typography
                  className="text-neutral-900"
                  variant="h6"
                  size="semibold">
                  #2308-1234
                </Typography>
                <Label variant="success" size={"sm"}>
                  RECEIVED
                </Label>
              </div>
            </div>
            <div>
              <Typography
                className="text-neutral-500"
                variant="body-2"
                size="regular">
                Donation Date.
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="h6"
                size="semibold">
                12/08/2023
              </Typography>
            </div>
          </div>
          <div className="my-4">
            <Typography
              variant="subtitle-2"
              size="semibold"
              className="text-neutral-900">
              Donator Information
            </Typography>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Name
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {name}
              </Typography>
            </div>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Email
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {email}
              </Typography>
            </div>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Postal Code
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {postalCode}
              </Typography>
            </div>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Unit Number
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {unitNumber}
              </Typography>
            </div>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Address
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {address}
              </Typography>
            </div>
            <div className="flex flex-row gap-x-4 mt-2">
              <Typography
                className="text-neutral-500 w-40"
                variant="body-1"
                size="regular">
                Remarks
              </Typography>
              <Typography
                className="text-neutral-900"
                variant="body-1"
                size="regular">
                {remarks}
              </Typography>
            </div>

            {taxDeduction && (
              <>
                <Typography
                  variant="subtitle-2"
                  size="semibold"
                  className="text-neutral-900 mt-6 mb-2">
                  Tax Deduction Information
                </Typography>

                <div className="flex flex-row gap-x-5">
                  <div className="flex flex-col gap-y-2">
                    <Typography
                      className="text-neutral-500"
                      variant="body-1"
                      size="regular">
                      Tax Recipient Full Name
                    </Typography>
                    <Typography
                      className="text-neutral-900"
                      variant="body-1"
                      size="regular">
                      {taxRecipientFullName}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Typography
                      className="text-neutral-500"
                      variant="body-1"
                      size="regular">
                      Tax Recipient ID No.
                    </Typography>
                    <Typography
                      className="text-neutral-900"
                      variant="body-1"
                      size="regular">
                      {taxRecipientId}
                    </Typography>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="border rounded-2xl bg-white p-5">
          <Typography>
            You can share your donation or download the receipt
          </Typography>
          <div className="flex flex-row gap-x-4 mt-5">
            <Button variant={"info"}>Share Donation</Button>
            <Button
              onClick={handleDownload}
              variant={"white"}
              className="border flex flex-row gap-x-2 items-center">
              Download PDF
              <img src={IcDownload} alt="Download PDF" className="mb-1" />
            </Button>
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

export default SuccessPage;
