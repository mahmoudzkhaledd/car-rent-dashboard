
export const adminConfig = {
    sidebarItems: {
        dashboard: {
            title: "لوحة التحكم",
            icon: "fa-solid fa-chart-pie",
            name: "",
        },
        cars: {
            title: "الاحصاءات",
            icon: "fa-solid fa-chart-simple",
            name: "cars",
        },

        packages: {
            title: "الباقات",
            icon: "fa-solid fa-box-open",
            name: "packages",
        },
        rents: {
            title: "الحجوزات",
            icon: "fa-solid fa-retweet",
            name: "rents",
        },
        teams: {
            title: "الفرق",
            icon: "fa-solid fa-user-group",
            name: "teams",
        },


        admins: {
            title: "المديرين",
            icon: "fa-solid fa-shield",
            name: "admins",
            roles: [
                "SeeAllAdmins",
                "AddAdmin",
                "SeeAdminDetails",
                "SeeAdminOrders",
                "EditAdmin",
                "SuspendUnSuspendAdmin",
                "DeleteAdmin",
            ],
        },
        users: {
            title: "المستخدمين",
            icon: "fa-solid fa-user",
            name: "users",
            roles: [
                "SeeAllUsers",
                "SeeSingleUser",
                "BanUnBanUser",
                "EnterUserAccount",
                "ActiveUnActiveUserAccount",
            ],
        },



    },
    homepageCards: [
        {
            title: "عدد المستخدمين",
            icon: "fa-solid fa-user",
            ref: "users",
        },
        {
            title: "عدد المديرين",
            icon: "fa-solid fa-shield",
            ref: "admins",
        },
        {
            title: "عدد الباقات",
            icon: "fa-solid fa-box",
            ref: "meals",
        },
        

    ],
    supportedImages: [
        'image/png',
        'image/jpeg',
        'image/jpg',
    ],
    guides: {
        
       
    }
};
