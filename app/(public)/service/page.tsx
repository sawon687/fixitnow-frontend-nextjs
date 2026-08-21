import React from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Sparkles,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getCategre } from "../../../commonService/getCategrie";
import { LeftSideFilter } from "./_components/LeftSideFilter";
import ServiceCard from "./_components/ServiceCard";
import { getAllService } from "./_actions/serviceActions";

import { ICategory, ISeachParmas, IService } from "../../../utils/type";

import Searchfeild from "./_components/Searchfeild";
import Header from "./_components/Header";
import MotionAniBox from "../../../components/shared/MotionAniBox";
import { CATEGORIES_DATA } from "../../../commonService/service";
import Pagenation from './_components/Pagenation';

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<ISeachParmas>;
}) {
  const params = await searchParams;

  const result = await getCategre();

  const filterService = (await getAllService(params)) || [];

  const category = result?.data?.allcategory || [];

  const locationtechnician = filterService.map(
    (s: IService) => s.technician.location,
  );

  const locations = [
    "All",
    ...Array.from(new Set(locationtechnician)),
  ] as string[];

  const categoryNames = category.map((c: ICategory) => c.name);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b0f] text-slate-100">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-40 -top-40
            h-[500px] w-[500px]
            rounded-full
            bg-emerald-500/[0.07]
            blur-[130px]
          "
        />

        <div
          className="
            absolute right-[-180px] top-[25%]
            h-[500px] w-[500px]
            rounded-full
            bg-cyan-500/[0.045]
            blur-[130px]
          "
        />

        <div
          className="
            absolute bottom-[-200px] left-[30%]
            h-[450px] w-[450px]
            rounded-full
            bg-emerald-500/[0.035]
            blur-[120px]
          "
        />
      </div>

      {/* Subtle Grid */}

      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.025]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative z-10
          mx-auto w-full max-w-[1500px]
          px-4 py-8
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* =====================================================
            TOP HEADER
        ====================================================== */}

        <section className="mb-8">
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
            relative mb-8
            overflow-hidden
            rounded-2xl
            border border-slate-800/80
            bg-slate-900/60
            p-4
            shadow-[0_20px_60px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
            sm:p-5
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute -right-20 -top-20
              h-40 w-40
              rounded-full
              bg-emerald-500/10
              blur-3xl
            "
          />

          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  bg-emerald-500/10
                "
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-300">
                  Find the right service
                </p>

                <p className="text-[10px] text-slate-600">
                  Search from our trusted professionals
                </p>
              </div>
            </div>

            <Searchfeild />
          </div>
        </section>

        {/* =====================================================
            RESULT SUMMARY
        ====================================================== */}

        <div
          className="
            mb-5
            flex flex-col gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-emerald-400" />

              <h2 className="text-sm font-bold text-white">
                Available Services
              </h2>

              <span
                className="
                  rounded-full
                  border border-slate-800
                  bg-slate-900
                  px-2 py-0.5
                  text-[10px]
                  font-semibold
                  text-slate-500
                "
              >
                {filterService.length}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-600">
              Explore services from verified professionals.
            </p>
          </div>

          {/* Sort */}

          <div
            className="
              flex items-center gap-2
              text-[11px]
              text-slate-600
            "
          >
            <span>Sorted by</span>

            <span
              className="
                inline-flex items-center gap-1
                rounded-lg
                border border-slate-800
                bg-slate-900
                px-2.5 py-1.5
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
            lg:grid-cols-[250px_minmax(0,1fr)]
            xl:gap-8
          "
        >
          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-6
              lg:self-start
            "
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border border-slate-800/80
                bg-slate-900/55
                shadow-xl
                backdrop-blur-xl
              "
            >
              {/* Sidebar Header */}

              <div
                className="
                  border-b
                  border-slate-800/80
                  px-4 py-3
                "
              >
                <div className="flex items-center gap-2">
                  <div
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.8)]
                    "
                  />

                  <span className="text-xs font-bold text-slate-300">
                    Filters
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Refine your search
                </p>
              </div>

              {/* Filter */}

              <div className="p-3">
                <LeftSideFilter
                  locations={locations}
                  categoryNames={categoryNames}
                />
              </div>
            </div>
          </aside>

          {/* =================================================
              SERVICE GRID
          ================================================== */}

          <section className="min-w-0">
            {filterService.length > 0 ? (
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
                  {filterService.map((service: IService, index: number) => (
                    <ServiceCard
                      service={service}
                      index={index}
                      key={service.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              /* =============================================
                 EMPTY STATE
              ============================================== */

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
                  flex min-h-[420px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border border-slate-800
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
                    flex h-16 w-16
                    items-center justify-center
                    rounded-2xl
                    border border-slate-800
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
                  We couldn't find any services matching your current filters.
                  Try changing your search or selecting different options.
                </p>
              </MotionAniBox>
            )}
          </section>
        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}
         <Pagenation filterService={filterService}></Pagenation>
      
      </div>
    </main>
  );
}
