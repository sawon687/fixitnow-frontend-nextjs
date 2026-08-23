import React from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Sparkles,
  Wrench,
  SlidersHorizontal,
} from "lucide-react";

import { getCategre } from "../../../commonService/getCategrie";
import { LeftSideFilter } from "./_components/LeftSideFilter";
import ServiceCard from "./_components/ServiceCard";
import { getAllService } from "./_actions/serviceActions";

import {
  ICategory,
  ISeachParmas,
  IService,
} from "../../../utils/type";

import Searchfeild from "./_components/Searchfeild";
import Header from "./_components/Header";
import MotionAniBox from "../../../components/shared/MotionAniBox";
import { CATEGORIES_DATA } from "../../../commonService/service";
import Pagenation from "./_components/Pagenation";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<ISeachParmas>;
}) {
  const params = await searchParams;

  /* =====================================================
     DATA
  ====================================================== */

  const result = await getCategre();

  const {
    totalpage,
    serviceInfo = [],
    locations = [],
  } = (await getAllService(params)) || {};

  const category = result?.data?.allcategory || [];

  /* =====================================================
     FILTER DATA
  ====================================================== */

  const location = locations.map((l) => l.location);

  const categoryNames = category.map(
    (c: ICategory) => c.name
  );

  return (
    <main className="relative -top-30 pt-30 min-h-screen overflow-hidden bg-[#070b0f] text-slate-100">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Left Glow */}
        <div
          className="
            absolute
            -left-48
            -top-48
            h-[520px]
            w-[520px]
            rounded-full
            bg-emerald-500/[0.065]
            blur-[140px]
            -mt-50
          "
        />

        {/* Right Glow */}
        <div
          className="
            absolute
            -right-48
            top-[20%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-cyan-500/[0.045]
            blur-[140px]
          "
        />

        {/* Bottom Glow */}
        <div
          className="
            absolute
            bottom-[-220px]
            left-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-500/[0.03]
            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.022]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          lg:px-0
          py-8
         
        "
      >

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="mb-7">
          <Header
            categoryNames={categoryNames}
            CATEGORIES_DATA={CATEGORIES_DATA}
          />
        </section>

        {/* =====================================================
            SEARCH AREA
        ====================================================== */}

        <section
          className="
            relative
            mb-8
            overflow-hidden
            rounded-2xl
            border
            border-slate-800/80
            bg-slate-900/55
            p-4
            shadow-[0_20px_60px_rgba(0,0,0,0.16)]
            backdrop-blur-xl
            sm:p-5
          "
        >

          {/* Search Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-48
              w-48
              rounded-full
              bg-emerald-500/[0.09]
              blur-3xl
            "
          />

          <div className="relative">

            {/* Search Header */}

            <div className="mb-3 flex items-center gap-2.5">

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-emerald-500/10
                  bg-emerald-500/10
                "
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-300">
                  Find the right service
                </p>

                <p className="mt-0.5 text-[10px] text-slate-600">
                  Search from our trusted professionals
                </p>
              </div>

            </div>

            {/* Search */}

            <Searchfeild />

          </div>
        </section>

        {/* =====================================================
            RESULT HEADER
        ====================================================== */}

        <div
          className="
            mb-5
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* Result Info */}

          <div>

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-500/10
                "
              >
                <BriefcaseBusiness className="h-3.5 w-3.5 text-emerald-400" />
              </div>

              <h2 className="text-sm font-bold text-white">
                Available Services
              </h2>

              <span
                className="
                  rounded-full
                  border
                  border-slate-800
                  bg-slate-900
                  px-2
                  py-0.5
                  text-[10px]
                  font-semibold
                  text-slate-500
                "
              >
                {serviceInfo.length}
              </span>

            </div>

            <p className="mt-1 text-[11px] text-slate-600">
              Explore services from verified professionals.
            </p>

          </div>

          {/* Sort */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[11px]
              text-slate-600
            "
          >

            <span>
              Sorted by
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-slate-800
                bg-slate-900
                px-3
                py-1.5
                font-medium
                text-slate-400
              "
            >
              Top Rated

              <ArrowDown className="h-3 w-3" />
            </span>

          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[240px_minmax(0,1fr)]
            xl:grid-cols-[250px_minmax(0,1fr)]
            xl:gap-7
          "
        >

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-5
              lg:self-start
            "
          >

            <div
              className="
                overflow-hidden
                rounded-[22px]
                border
                border-slate-800/70
                bg-slate-950/65
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-2xl
              "
            >

              {/* Sidebar Header */}

              <div
                className="
                  border-b
                  border-slate-800/70
                  bg-slate-900/30
                  px-4
                  py-4
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-800
                        bg-slate-900
                      "
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-400" />
                    </div>

                    <div>

                      <p className="text-xs font-bold text-white">
                        Filters
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-600">
                        Refine your results
                      </p>

                    </div>

                  </div>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.8)]
                    "
                  />

                </div>

              </div>

              {/* Filter Content */}

              <div className="p-3">
                <LeftSideFilter
                  locations={location}
                  categoryNames={categoryNames}
                />
              </div>

            </div>
          </aside>

          {/* =================================================
              SERVICE CONTENT
          ================================================== */}

          <section className="min-w-0">

            {serviceInfo.length > 0 ? (

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >

                <AnimatePresence mode="popLayout">

                  {serviceInfo.map(
                    (
                      service: IService,
                      index: number
                    ) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                      />
                    )
                  )}

                </AnimatePresence>

              </div>

            ) : (

              /* =================================================
                 EMPTY STATE
              ================================================== */

              <MotionAniBox
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  flex
                  min-h-[420px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/50
                  px-6
                  text-center
                  shadow-xl
                  backdrop-blur-xl
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950
                    shadow-lg
                  "
                >
                  <Wrench className="h-7 w-7 text-slate-600" />
                </div>

                <h3 className="text-base font-bold text-slate-200">
                  No services found
                </h3>

                <p
                  className="
                    mt-2
                    max-w-sm
                    text-xs
                    leading-5
                    text-slate-600
                  "
                >
                  We couldn't find any services matching your
                  current filters. Try changing your search or
                  selecting different options.
                </p>

              </MotionAniBox>

            )}

          </section>

        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        <div className="mt-8">
          <Pagenation
            filterService={serviceInfo}
            totalPage={totalpage}
          />
        </div>

      </div>
    </main>
  );
}