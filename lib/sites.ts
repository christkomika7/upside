import { Building2Icon, CogIcon, HousePlusIcon, LandPlotIcon, Settings2Icon } from "lucide-react";
import { SiteConfigType } from "./type";

export const siteConfig: SiteConfigType = {
    navmenu: [
        {
            id: "navmenu1",
            title: "Home",
            url: "/"
        },
        {
            id: "navmenu2",
            title: "Buy",
            url: "/buy"
        },
        {
            id: "navmenu3",
            title: "Rent",
            url: "/rent"
        },
        {
            id: "navmenu4",
            title: "Manage",
            url: "/management"
        },
        // {
        //     id: "navmenu5",
        //     title: "Expertise",
        //     url: "/expertise"
        // },
        {
            id: "navmenu6",
            title: "Contact",
            url: "/contact"
        },
    ],
    sidemenu: [
        {
            id: "sidemenu1",
            icon: HousePlusIcon,
            title: "Maison",
            url: "/admin/real-state"
        },
        {
            id: "sidemenu2",
            icon: Building2Icon,
            title: "Ville",
            url: "/admin/city"
        },
        {
            id: "sidemenu3",
            icon: LandPlotIcon,
            title: "Quartier",
            url: "/admin/district"
        },
        {
            id: "sidemenu4",
            icon: Settings2Icon,
            title: "Option",
            url: "/admin/option"
        },
        {
            id: "sidemenu5",
            icon: CogIcon,
            title: "Parametres",
            url: "/admin/settings"
        },
    ]

}