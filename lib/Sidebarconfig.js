// lib/sidebar-configs.js
"use client"; // This file can be used on the client side for imports

import {
  BookUser,
  ClipboardType,
  FileUser,
  BriefcaseBusinessIcon,
  HomeIcon,
  CarIcon,
  HandCoinsIcon,
  Users2Icon,
  LucideNotebookPen,
  MessageSquareText,
  Contact2Icon,
  UserPlus2Icon,
  List,
  LayoutDashboard,
  Bike,
  UserPen,
  ChevronDown, // Added for collapsible indicator
} from "lucide-react";

// Map of icon names to actual Lucide React components - EXPORTED NOW
export const iconMap = {
  ClipboardType,
  FileUser,
  BriefcaseBusinessIcon,
  HomeIcon,
  CarIcon,
  HandCoinsIcon,
  Users2Icon,
  BookUser,
  LucideNotebookPen,
  MessageSquareText,
  Contact2Icon,
  UserPlus2Icon,
  List,
  LayoutDashboard,
  Bike,
  UserPen,
  ChevronDown, // Include ChevronDown if you want to use it directly from map
};


export const AdminSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
      ],
    },
    {
      title: "Team members",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Connectors",
          url: "/dashboard/admin/view/connectors",
        },
        {
          title: "Regional manager",
          url: "/dashboard/admin/view/rm",
        },
        {
          title: "Field Staff",
          url: "/dashboard/admin/view/fieldstaff",
        },
        {
          title: "Telecaller",
          url: "/dashboard/admin/view/telecaller",
        },
      ],
    },
    {
      title: "Actions",
      url: "#",
      icon: BookUser,
      items: [
        {
          title: "Account Creation",
          url: "/dashboard/admin/signup",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Field staff Report",
          url: "/dashboard/admin/reports/field-staff",
        },
        {
          title: "Tellecaller Reports",
          url: "/dashboard/admin/reports/telecaller",
        },
        {
          title: "Loans Report",
          url: "/dashboard/admin/view/loans",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     title: "Blogs",
  //     url: "/admin/blogs",
  //     icon: LucideNotebookPen,
  //   },
  //   {
  //     title: "Testimonials",
  //     url: "/admin/testimonials",
  //     icon: MessageSquareText,
  //   },
  //   {
  //     title: "Contact us",
  //     url: "/admin/contact_data",
  //     icon: Contact2Icon,
  //   },
  //   {
  //     title: "Career applications",
  //     url: "/admin/careers",
  //     icon: UserPlus2Icon,
  //   },
  // ],
};

// RM side bar
export const RMSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
      ],
    },
    {
      title: "Loans",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Category Wise",
          url: "/dashboard/admin/view/loans/category",
        },
        {
          title: "Member Wise",
          url: "/dashboard/admin/view/loans/member",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: LucideNotebookPen,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: MessageSquareText,
    },
    {
      title: "Contact us",
      url: "/admin/contact_data",
      icon: Contact2Icon,
    },
  ],
};

export const DSASidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
      ],
    },
    {
      title: "Loans",
      url: "#",
      icon: Users2Icon,
      items: [
        {
          title: "Category Wise",
          url: "/dashboard/dsa/view/loans/category",
        },
        {
          title: "Member Wise",
          url: "/dashboard/dsa/view/loans/member",
        },
      ],
    },
  ],
  projects: [
    {
      title: "My Income",
      url: "/dsa/my-income",
      icon: HandCoinsIcon,
    },
    {
      title: "Dashboard",
      url: "/dsa/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Raise Ticket",
      url: "/dsa/raise-ticket",
      icon: Contact2Icon,
    },
  ],
};
export const TelecallerSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
      ],
    },
    {
      title: "Calling List",
      url: "#",
      icon: List,
      items: [
        {
          title: "Daily Calling List",
          url: "/dashboard/telecaller/daily-task",
        },
        {
          title: "Member Wise",
          url: "/dashboard/telecaller/",
        },
      ],
    },
  ],
  projects: [
    {
      title: "My Income",
      url: "/admin/my-income",
      icon: HandCoinsIcon,
    },
    {
      title: "Dashboard",
      url: "/dashboard/telecaller/",
      icon: LayoutDashboard,
    },
  ],
};
export const FieldStaffSidebar = {
  navMain: [
    {
      title: "Loan Applications",
      url: "/dashboard",
      icon: ClipboardType,
      items: [
        {
          title: "Personal Loan",
          url: "/dashboard/forms/personal_loan",
          icon: FileUser,
        },
        {
          title: "Business Loan",
          url: "/dashboard/forms/business_loan",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Home Loan",
          url: "/dashboard/forms/home_loan",
          icon: HomeIcon,
        },
        {
          title: "Vehicle Loan",
          url: "/dashboard/forms/vehicle_loan",
          icon: CarIcon,
        },
        {
          title: "Gold Loan",
          url: "/dashboard/forms/gold_loan",
          icon: HandCoinsIcon,
        },
      ],
    },
  ],
  projects: [
    {
      title: "Dashboard",
      url: "/dashboard/field-staff",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/dashboard/field-staff/profile",
      icon: UserPen,
    },
    {
      title: "Daily Visit",
      url: "/dashboard/field-staff/visit-report",
      icon: Bike,
    },
  ],
};
