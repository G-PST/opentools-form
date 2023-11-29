import { LanguageInterface } from "./interface";
import { LicenseInterface, FormOption } from "./interface";


export const INPUTSTYLE = `outline-none text-orange-700 
      px-2 py-1 border rounded-md outline-none w-full`;


export const FORMOPTIONS: FormOption[] = [
    {
        name: "name",
        type: "text",
        displayName: "Organization Name",
        required: true,
        category: "organization"
    },
    {
        name: "description",
        type: "text",
        displayName: "Description",
        required: false,
        category: "organization"
    },
    {
        name: "url",
        type: "text",
        displayName: "Website or URL",
        required: false,
        category: "organization"
    },
    {
        name: "name",
        type: "text",
        displayName: "License Name",
        required: true,
        category: "license"
    },
    {
        name: "spdx_id",
        type: "text",
        displayName: "SPDX ID",
        required: true,
        category: "license"
    },
    {
        name: "name",
        type: "text",
        displayName: "Organization Name",
        required: true,
        category: "language"
    },
    {
        name: "description",
        type: "text",
        displayName: "Description",
        required: false,
        category: "language"
    },
    {
        name: "url",
        type: "text",
        displayName: "Website or URL",
        required: false,
        category: "language"
    },
    {
        name: "name",
        type: "text",
        displayName: "Software Name",
        required: true,
        category: "software"
    },
    {
        name: "description",
        type: "text",
        displayName: "Description",
        required: false,
        category: "software"
    },
    {
        name: "url_website",
        type: "text",
        displayName: "Webiste",
        required: false,
        category: "software"
    },
    {
        name: "url_sourcecode",
        type: "text",
        displayName: "Repository URL",
        required: false,
        category: "software"
    },
    {
        name: "url_docs",
        type: "text",
        displayName: "Documentation URL",
        required: false,
        category: "software"
    }
]






// Got from https://opensource.org/licenses/
export const LICENSES: LicenseInterface[] = [
    {
        name: "1-clause BSD License",
        id: "BSD-1-Clause"
    },
    {
        name: "Academic Free License v. 3.0",
        id: "AFL-3.0"
    },
    {
        name: "Adaptive Public License 1.0",
        id: "APL-1.0"
    },
    {
        name: "Apache License, Version 2.0",
        id: "Apache-2.0"
    },
    {
        name: "Apache Software License, version 1.1",
        id: "Apache-1.1"
    },
    {
        name: "Apple Public Source License 2.0",
        id: "APSL-2.0"
    },
    {
        name: "Artistic License (Perl) 1.0",
        id: "Artistic-1.0-Perl"
    },
    {
        name: "Artistic License 1.0",
        id: "Artistic-1.0"
    },
    {
        name: "Artistic License 2.0",
        id: "Artistic-2.0"
    },
    {
        name: "Attribution Assurance License",
        id: "AAL"
    },
    {
        name: "Boost Software License 1.0",
        id: "BSL-1.0"
    },
    {
        name: "BSD+Patent",
        id: "BSD-2-Clause-Patent"
    },
    {
        name: "Cea Cnrs Inria Logiciel Libre License, version 2.1",
        id: "CECILL-2.1"
    },
    {
        name: "CERN Open Hardware Licence Version 2 Permissive",
        id: "CERN-OHL-P-2.0"
    },
    {
        name: "CERN Open Hardware Licence Version 2 Strongly Reciprocal",
        id: "CERN-OHL-S-2.0"
    },
    {
        name: "CERN Open Hardware Licence Version 2 Weakly Reciprocal",
        id: "CERN-OHL-W-2.0"
    },
    {
        name: "Common Development and Distribution License 1.0",
        id: "CDDL-1.0"
    },
    {
        name: "Common Public Attribution License Version 1.0",
        id: "CPAL-1.0"
    },
    {
        name: "Common Public License Version 1.0",
        id: "CPL-1.0"
    },
    {
        name: "Computer Associates Trusted Open Source License 1.1",
        id: "CATOSL-1.1"
    },
    {
        name: "Cryptographic Autonomy License",
        id: "CAL-1.0"
    },
    {
        name: "CUA Office Public License",
        id: "CUA-OPL-1.0"
    },
    {
        name: "Eclipse Public License -v 1.0",
        id: "EPL-1.0"
    },
    {
        name: "Eclipse Public License version 2.0",
        id: "EPL-2.0"
    },
    {
        name: "eCos License version 2.0",
        id: "eCos-2.0"
    },
    {
        name: "Educational Community License, Version 1.0",
        id: "ECL-1.0"
    },
    {
        name: "Educational Community License, Version 2.0",
        id: "ECL-2.0"
    },
    {
        name: "Eiffel Forum License, version 1",
        id: "EFL-1.0"
    },
    {
        name: "Eiffel Forum License, Version 2",
        id: "EFL-2.0"
    },
    {
        name: "Entessa Public License Version. 1.0",
        id: "Entessa"
    },
    {
        name: "EU DataGrid Software License",
        id: "EUDatagrid"
    },
    {
        name: "European Union Public License, version 1.2",
        id: "EUPL-1.2"
    },
    {
        name: "Fair License",
        id: "Fair"
    },
    {
        name: "Frameworx License 1.0",
        id: "Frameworx-1.0"
    },
    {
        name: "GNU Affero General Public License version 3",
        id: "AGPL-3.0-only"
    },
    {
        name: "GNU General Public License version 2",
        id: "GPL-2.0"
    },
    {
        name: "GNU General Public License version 3",
        id: "GPL-3.0-only"
    },
    {
        name: "GNU Lesser General Public License version 2.1",
        id: "LGPL-2.1"
    },
    {
        name: "GNU Lesser General Public License version 3",
        id: "LGPL-3.0-only"
    },
    {
        name: "GNU Library General Public License version 2",
        id: "LGPL-2.0-only"
    },
    {
        name: "Historical Permission Notice and Disclaimer",
        id: "HPND"
    },
    {
        name: "IBM Public License Version 1.0",
        id: "IPL-1.0"
    },
    {
        name: "Intel Open Source License",
        id: "Intel"
    },
    {
        name: "IPA Font License",
        id: "IPA"
    },
    {
        name: "ISC License",
        id: "ISC"
    },
    {
        name: "JAM License",
        id: "Jam"
    },
    {
        name: "LaTeX Project Public License, Version 1.3c",
        id: "LPPL-1.3c"
    },
    {
        name: "Lawrence Berkeley National Labs BSD Variant License",
        id: "BSD-3-Clause-LBNL"
    },
    {
        name: "Licence Libre du Qubec  Permissive version 1.1",
        id: "LiLiQ-P-1.1"
    },
    {
        name: "Licence Libre du Qubec  Rciprocit forte version 1.1",
        id: "LiLiQ-Rplus-1.1"
    },
    {
        name: "Licence Libre du Qubec  Rciprocit version 1.1",
        id: "LiLiQ-R-1.1"
    },
    {
        name: "Lucent Public License Version 1.02",
        id: "LPL-1.02"
    },
    {
        name: "Lucent Public License, Plan 9, version 1.0",
        id: "LPL-1.0"
    },
    {
        name: "Microsoft Public License",
        id: "MS-PL"
    },
    {
        name: "Microsoft Reciprocal License",
        id: "MS-RL"
    },
    {
        name: "MirOS License",
        id: "MirOS"
    },
    {
        name: "MIT No Attribution License",
        id: "MIT-0"
    },
    {
        name: "Motosoto Open Source License",
        id: "Motosoto"
    },
    {
        name: "Mozilla Public License 1.1",
        id: "MPL-1.1"
    },
    {
        name: "Mozilla Public License 2.0",
        id: "MPL-2.0"
    },
    {
        name: "Mozilla Public License, version 1.0",
        id: "MPL-1.0"
    },
    {
        name: "Mulan Permissive Software License v2",
        id: "MulanPSL-2.0"
    },
    {
        name: "Multics License",
        id: "Multics"
    },
    {
        name: "NASA Open Source Agreement v1.3",
        id: "NASA-1.3"
    },
    {
        name: "NAUMEN Public License",
        id: "Naumen"
    },
    {
        name: "Nokia Open Source License Version 1.0a",
        id: "NOKIA"
    },
    {
        name: "Non-Profit Open Software License version 3.0",
        id: "NPOSL-3.0"
    },
    {
        name: "NTP License",
        id: "NTP"
    },
    {
        name: "Open Group Test Suite License",
        id: "OGTSL"
    },
    {
        name: "Open Logistics Foundation License v1.3",
        id: "OLFL-1.3"
    },
    {
        name: "Open Software License 2.1",
        id: "OSL-2.1"
    },
    {
        name: "Open Software License, version 1.0",
        id: "OSL-1.0"
    },
    {
        name: "OpenLDAP Public License Version 2.8",
        id: "OLDAP-2.8"
    },
    {
        name: "OSET Public License version 2.1",
        id: "OSET-PL-2.1"
    },
    {
        name: "PHP License 3.0",
        id: "PHP-3.0"
    },
    {
        name: "PHP License 3.01",
        id: "PHP-3.01"
    },
    {
        name: "Python License, Version 2",
        id: "PSF-2.0"
    },
    {
        name: "RealNetworks Public Source License Version 1.0",
        id: "RPSL-1.0"
    },
    {
        name: "Reciprocal Public License 1.5",
        id: "RPL-1.5"
    },
    {
        name: "Reciprocal Public License, version 1.1",
        id: "RPL-1.1"
    },
    {
        name: "SIL OPEN FONT LICENSE",
        id: "OFL-1.1"
    },
    {
        name: "Simple Public License",
        id: "SimPL-2.0"
    },
    {
        name: "Sun Industry Standards Source License",
        id: "SISSL"
    },
    {
        name: "Sun Public License, Version 1.0",
        id: "SPL-1.0"
    },
    {
        name: "The 2-Clause BSD License",
        id: "BSD-2-Clause"
    },
    {
        name: "The 3-Clause BSD License",
        id: "BSD-3-Clause"
    },
    {
        name: "The CNRI portion of the multi-part Python License",
        id: "CNRI-Python"
    },
    {
        name: "The European Union Public License, version 1.1",
        id: "EUPL-1.1"
    },
    {
        name: "The MIT License",
        id: "MIT"
    },
    {
        name: "The Nethack General Public License",
        id: "NGPL"
    },
    {
        name: "The Open Software License 3.0",
        id: "OSL-3.0"
    },
    {
        name: "The PostgreSQL Licence",
        id: "PostgreSQL"
    },
    {
        name: "The Q Public License Version",
        id: "QPL-1.0"
    },
    {
        name: "The Ricoh Source Code Public License",
        id: "RSCPL"
    },
    {
        name: "The Sleepycat License",
        id: "Sleepycat"
    },
    {
        name: "The Sybase Open Source Licence",
        id: "Watcom-1.0"
    },
    {
        name: "The Universal Permissive License Version 1.0",
        id: "UPL-1.0"
    },
    {
        name: "The University of Illinois/NCSA Open Source License",
        id: "NCSA"
    },
    {
        name: "The Unlicense",
        id: "Unlicense"
    },
    {
        name: "The Vovida Software License v. 1.0",
        id: "VSL-0.1"
    },
    {
        name: "The W3C SOFTWARE NOTICE AND LICENSE",
        id: "W3C-20150513"
    },
    {
        name: "The wxWindows Library Licence",
        id: "wxWindows"
    },
    {
        name: "The X.Net, Inc. License",
        id: "Xnet"
    },
    {
        name: "The zlib/libpng License",
        id: "Zlib"
    },
    {
        name: "Unicode, Inc. License Agreement  Data Files and Software",
        id: "Unicode-DFS-2015"
    },
    {
        name: "Upstream Compatibility License v1.0",
        id: "UCL-1.0"
    },
    {
        name: "Zero-Clause BSD",
        id: "0BSD"
    },
    {
        name: "Zope Public License 2.0",
        id: "ZPL - 2.0"
    },
    {
        name: "Zope Public License 2.1",
        id: "ZPL - 2.1"
    }
]

// Got from https://www.tiobe.com/tiobe-index/
export const PROGRAMMING_LANGUAGES: LanguageInterface[] = [
    {
        name: "Python"
    },
    {
        name: "C"
    },
    {
        name: "C++"
    },
    {
        name: "Java"
    },
    {
        name: "C#"
    },
    {
        name: "JavaScript"
    },
    {
        name: "Visual Basic"
    },
    {
        name: "SQL"
    },
    {
        name: "Assembly language"
    },
    {
        name: "PHP"
    },
    {
        name: "Scratch"
    },
    {
        name: "Go"
    },
    {
        name: "MATLAB"
    },
    {
        name: "Fortran"
    },
    {
        name: "COBOL"
    },
    {
        name: "R"
    },
    {
        name: "Ruby"
    },
    {
        name: "Swift"
    },
    {
        name: "Rust"
    },
    {
        name: "Julia"
    },
    {
        name: "SAS"
    },
    {
        name: "Classic Visual Basic"
    },
    {
        name: "Delphi/Object Pascal"
    },
    {
        name: "Ada"
    },
    {
        name: "Prolog"
    },
    {
        name: "(Visual) FoxPro"
    },
    {
        name: "Kotlin"
    },
    {
        name: "Perl"
    },
    {
        name: "Objective-C"
    },
    {
        name: "Lisp"
    },
    {
        name: "Scala"
    },
    {
        name: "Haskell"
    },
    {
        name: "D"
    },
    {
        name: "Lua"
    },
    {
        name: "Dart"
    },
    {
        name: "Logo"
    },
    {
        name: "GAMS"
    },
    {
        name: "VBScript"
    },
    {
        name: "Scheme"
    },
    {
        name: "Transact-SQL"
    },
    {
        name: "CFML"
    },
    {
        name: "PL/SQL"
    },
    {
        name: "ABAP"
    },
    {
        name: "Solidity"
    },
    {
        name: "TypeScript"
    },
    {
        name: "F#"
    },
    {
        name: "PowerShell"
    },
    {
        name: "Forth"
    },
    {
        name: "Bash"
    },
    {
        name: "X++"
    }
]