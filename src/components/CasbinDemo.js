// import React, { useEffect, useState } from "react";
// import { Authorizer } from "casbin.js";
// import { Button, Typography } from "@mui/material";

// const CasbinDemo = ({ user, manualData }) => {
//   const [auth, setAuth] = useState(null);
//   console.log(user, "aaaaaaaaaaaaaaaaaaaaa", manualData);

//   useEffect(() => {
//     if (manualData) {
//       const newAuth = new Authorizer("manual");
//       newAuth.setPermission(manualData);
//       setAuth(newAuth);
//     }
//   }, [manualData]);

//   const edit = (
//     <Button variant="outlined" color="secondary">
//       edit
//     </Button>
//   );
//   const deletdata = (
//     <Button variant="outlined" color="error">
//       delete
//     </Button>
//   );
//   const get = (
//     <Button variant="outlined" color="success">
//       get
//     </Button>
//   );
//   const post = <Button variant="contained">post</Button>;

//   if (auth && auth.permission) {
//     console.log(
//       auth.permission.check("PATCH", "/api/usercasbinData/subadmin-access/*")
//     );
//   }

//   return (
//     <div>
//       <p>====</p>
//       <Typography variant="h4">Manual</Typography>
//       {auth &&
//         auth.permission &&
//         auth.permission.check(
//           "PATCH",
//           "/api/usercasbinData/subadmin-access/*"
//         ) &&
//         edit}
//       {auth &&
//         auth.permission &&
//         auth.permission.check(
//           "DELETE",
//           "/api/usercasbinData/subadmin-access/*"
//         ) &&
//         deletdata}
//       {auth &&
//         auth.permission &&
//         auth.permission.check("GET", "/api/usercasbinData/subadmin-access/*") &&
//         get}
//       {auth &&
//         auth.permission &&
//         auth.permission.check(
//           "POST",
//           "/api/usercasbinData/subadmin-access/*"
//         ) &&
//         post}
//       <p>====</p>
//     </div>
//   );
// };

// export default CasbinDemo;

import React, { useEffect, useState } from "react";
import { Authorizer } from "casbin.js";
import { Button, Typography } from "@mui/material";

const CasbinDemo = ({ autoData }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (autoData) {
      const initializeAuthorizer = async () => {
        try {
          const authorizer = new Authorizer("auto", {
            endpoint:
              "http://192.168.77.18:18044/api/policydata/getPolicy/user/auto",
          });
          await authorizer.init(); // Initialize the authorizer
          authorizer.setUser(autoData);
          setAuth(authorizer);
        } catch (error) {
          console.error("Error initializing authorizer:", error);
        }
      };

      initializeAuthorizer();
    }
  }, [autoData]);

  const edit = (
    <Button variant="outlined" color="secondary">
      edit
    </Button>
  );
  const deletdata = (
    <Button variant="outlined" color="error">
      delete
    </Button>
  );
  const get = (
    <Button variant="outlined" color="success">
      get
    </Button>
  );
  const post = <Button variant="contained">post</Button>;

  const checkPermission = async (action, object) => {
    if (auth) {
      const canPerform = await auth.can(action, object);
      return canPerform;
    }
    return false;
  };

  return (
    <div>
      <p>====</p>
      <Typography variant="h4">Auto</Typography>
      {checkPermission("GET", "/api/usercasbinData/subadmin-access/*") && get}
      {checkPermission("POST", "/api/usercasbinData/subadmin-access/*") && post}
      {checkPermission("DELETE", "/api/usercasbinData/subadmin-access/*") && deletdata}
      {checkPermission("PATCH", "/api/usercasbinData/subadmin-access/*") && edit}
      <p>====</p>
    </div>
  );
};

export default CasbinDemo;
