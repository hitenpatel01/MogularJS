using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MogularJS.Controllers
{
    public class SpaController : Controller
    {
        public IActionResult Foo()
        {
            return View();
        }
        public IActionResult Bar()
        {
            return View();
        }
    }
}
