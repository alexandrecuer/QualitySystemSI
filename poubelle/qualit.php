<html>
<head>
	<base target="_right">
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Les documents ISO/COFRAC au DLCF</title>
    <link rel="stylesheet" type="text/css" href="ext/ressources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext/resources/docs.css" />
    <link rel="stylesheet" type="text/css" href="xml-tree-loader.css" />
	
	<script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="ext/ext-all.js"></script>
    <script type="text/javascript" src="ux/XmlTreeLoader.js"></script>
    <script type="text/javascript" src="xml-tree-loader.js"></script>

    
</head>
<body>
<?php
if (isset($_POST['year']))$year=$_POST['year']; else $year='2019';
echo("<div><table><tr>");
echo("<td><form name='choix' method=POST target='_left'><select name=year>");
for($z=2015;$z<2020;$z++)
	{
	echo("<option value=$z".(($z==$year)?(" selected"):("")).">modifications $z</option>");
	}
echo("</select></td>");
echo("<td><input type=submit value=valider></form></td>");
echo("</tr></table></div>");
//echo($year);
echo("<script type='text/javascript'>var year=\"".$year."\"</script>");
?>
    <div id="tree-div"></div>

</body>
</html>