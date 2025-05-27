"use client";
import Line from "@/components/common/Line/Line";
import PageWrapper from "@/components/common/pageWrapper/PageWrapper";
import TermTab from "@/components/user-side/terms-and-policy/TermsTab/TermTab";
import { useRedirect } from "@/context/redirectContext";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TermsAndPolicy = () => {
  const router = useRouter();
  const [termState, setTermState] = useState(null);
  const { isAcceptTerms } = useRedirect();

  console.log("isAcceptTerms.", isAcceptTerms);

  return (
    <div className="bg-terms-and-policy bg-cover bg-center bg-no-repeat page-height">
      <PageWrapper>
        <div className="f-col gap-[30px]">
          <h1 className="text-center text-white extra-large-2 bold  pt-2 md:pt-8 ">
            Terms and Policy
          </h1>
          {termState === null ? (
            <div className="term-and-policy-container px-9 md:px-6 sm:px-3 pt-4  pb-8">
              <p className="normal-text font-normal text-center text-accent-black">
                Short &#x26; Easily Readable for Clarification. Click on Any.
              </p>
              <div className="f-col gap-7">
                <TermTab
                  label="Terms and Conditions"
                  onClick={() => setTermState(1)}
                />
                <TermTab
                  label="Privacy Policy"
                  onClick={() => setTermState(2)}
                />
                <TermTab
                  label="Refund Policy"
                  onClick={() => setTermState(3)}
                />
              </div>
            </div>
          ) : termState === 1 ? (
            <div className="policy-box">
              <div className="policy-box-container policy-box-x-pad relative">
                {/* <div className="flex-center gap-3 cursor-pointer">
                  <svg
                    width="17"
                    height="28"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M15 2L3 14L15 26"
                      stroke="#2F2F2F"
                      stroke-width="3"></path>
                  </svg>
                  <p class="normal-text-2 bold text-left text-accent-black/80">
                    Terms & Cond.
                  </p>
                </div> */}
                <div class="policy-box-main-tab center-tab relative  left-1/2 -translate-x-1/2 ">
                  <p class="text-large-1 bold text-center text-accent-black">
                    Terms and Conditions
                  </p>
                </div>
                <div
                  className="sides-tab ml-auto col-auto row-auto lg:col-start-2 lg:row-start-1 "
                  onClick={() => setTermState(2)}>
                  <p class="normal-text-2 bold text-left text-accent-black/80 text-nowrap">
                    Privacy Policy
                  </p>
                  <svg
                    className="policy-box-icon"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M2 2L14 14L2 26"
                      stroke="#2F2F2F"
                      stroke-width="3"></path>
                  </svg>
                </div>
              </div>
              <Line className={"policy-box-line"} />
              <div className="policy-box-body pl-[81px] pr-[81px] md:pl-[40px] md:pr-[40px] sm:pl-[20px] sm:pr-[20px] ">
                <h3 className="font-bold">Services Provided</h3>
                <h5>We offer:</h5>
                <ul className="policy-box-pad-body">
                  <li>
                    Home design services, ensuring technical accuracy and
                    regulatory compliance.
                  </li>
                  <li>
                    Assistance in material procurement through partnered
                    suppliers in Pakistan.
                  </li>
                  <li>
                    Property services by connecting clients with third-party
                    agents.
                  </li>
                </ul>
                <h3 className="font-bold">Responsibilities</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    We take full responsibility for architectural and
                    engineering design services, ensuring they meet agreed
                    technical and regulatory standards.
                  </li>
                  <li>
                    We facilitate connections with material suppliers and
                    property agents but do not directly supply materials or
                    properties.
                  </li>
                  <li>
                    In case of third-party issues, we assist in resolving
                    disputes but are not liable for the actions of suppliers or
                    agents.
                  </li>
                </ul>
                <h3 className="font-bold">Client Obligations</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    Clients must provide accurate information and cooperate
                    during project execution.
                  </li>
                  <li>
                    Any modifications requested after agreement may incur
                    additional costs.
                  </li>
                </ul>
                <h3 className="font-bold">Limitation of Liability</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    We are responsible for any design flaws or regulatory
                    failures in our home design services.
                  </li>
                  <li>
                    We are not liable for third-party failures but will assist
                    in resolution where possible.
                  </li>
                </ul>
              </div>
            </div>
          ) : termState === 2 ? (
            <div className="policy-box">
              <div className="policy-box-container policy-box-x-pad relative">
                <div
                  className="sides-tab mr-auto "
                  onClick={() => setTermState(1)}>
                  <svg
                    className="policy-box-icon"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M15 2L3 14L15 26"
                      stroke="#2F2F2F"
                      stroke-width="3"></path>
                  </svg>
                  <p class="normal-text-2 bold text-left text-accent-black/80">
                    Terms & Cond.
                  </p>
                </div>
                <div class="policy-box-main-tab center-tab relative left-0 translate-x-0 lg:left-1/2 lg:-translate-x-1/2 ">
                  <p class="text-large-1 bold text-center text-accent-black">
                    Privacy Policy
                  </p>
                </div>
                <div
                  className="sides-tab ml-auto"
                  onClick={() => setTermState(3)}>
                  <p class="normal-text-2 bold text-left text-accent-black/80">
                    Refund Policy
                  </p>
                  <svg
                    className="policy-box-icon"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M2 2L14 14L2 26"
                      stroke="#2F2F2F"
                      stroke-width="3"></path>
                  </svg>
                </div>
              </div>
              <Line className={"policy-box-line"} />
              <div className="policy-box-body pl-[121px] pr-[101px]">
                <h3 className="font-bold">Information Collected</h3>
                <p>
                  We collect cnly the name and contact number ol clients and
                  usles.
                </p>
                <h3 className="font-bold">Use of Information</h3>

                <ul className="policy-box-pad-body">
                  <li>
                    This information is strictly used for business
                    communication.
                  </li>
                  <li>Only authorized personnel can access this data.</li>
                </ul>
                <h3 className="font-bold">Confidentiality</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    Any additional personal details shared in chat remain
                    confidential and are not disclosed unless legally required.
                  </li>
                  <li>
                    We implement security measures to prevent data breaches.
                  </li>
                </ul>
                <h3 className="font-bold">Third-Party Sharing</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    We do not sell, trade, or share client information with
                    third parties, except as required by law.
                  </li>
                </ul>
              </div>
            </div>
          ) : termState === 3 ? (
            <div className="policy-box">
              <div className="policy-box-container policy-box-x-pad relative">
                <div
                  className="sides-tab mr-auto"
                  onClick={() => setTermState(2)}>
                  <svg
                    className="policy-box-icon"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M15 2L3 14L15 26"
                      stroke="#2F2F2F"
                      stroke-width="3"></path>
                  </svg>
                  <p class="normal-text-2 bold text-left text-accent-black/80">
                    Privacy Policy
                  </p>
                </div>
                <div class="policy-box-main-tab center-tab  relative right-1/2 lg:left-1/2 lg:-translate-x-1/2 translate-x-1/2">
                  <p class="text-large-1 bold text-center text-accent-black">
                    Refund Policy
                  </p>
                </div>
              </div>
              <Line className={"policy-box-line"} />
              <div className="policy-box-body pl-[121px] pr-[101px] ">
                <h3 className="font-bold">Home Design Services</h3>
                <p>Refunds are provided if:</p>

                <ul className="policy-box-pad-body">
                  <li>Agreed-upon design elements are not fulfilled.</li>

                  <li>
                    The design contains flaws or fails regulatory approval due
                    to our mistake.
                  </li>
                  <li>Refunds are case-by-case, depending on severity.</li>
                </ul>
                <p>No refunds will be provided if:</p>
                <ul className="policy-box-pad-body">
                  <li>Clients request modifications after agreement.</li>
                </ul>
                <h3 className="font-bold">Material Procurement</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    If the partnered supplier fails to deliver materials, we
                    provide a full refund.
                  </li>
                </ul>

                <h3 className="font-bold">Property Services</h3>
                <ul className="policy-box-pad-body">
                  <li>
                    If issues arise with a third-party agent, we assist in
                    resolving them but do not provide refunds as we are not
                    direct property suppliers.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
          {!isAcceptTerms ? (
            <div className="mx-auto flex justify-center items-center common-btn-size  relative rounded bg-white shadow-btn-shadow cursor-pointer  text-accent-gray hover:bg-transparent hover:text-white hover:border-white hover:border-[2px] base-text text-center uppercase">
              accept
            </div>
          ) : (
            <></>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default TermsAndPolicy;
