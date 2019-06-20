<?xml version="1.0" ?>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
<style>
html{border:0px;}
table	{padding: 0px 0px 0px 0px;}
tr	{padding: 0px 0px 0px 0px;}
td	{padding: 0px 0px 0px 0px;}
</style>
	<body>
		<xsl:for-each select="items/pro">
				<h2><xsl:value-of select="@name" /></h2>
					<xsl:for-each select="port">
						<p style="margin-left: 30px"><h4>Type : <xsl:value-of select="@name" /></h4></p>
							<p style="margin-left: 60px">
							<table border='0' cellspacing='1' bgcolor='black'>
							<xsl:for-each select="doc">
								<tr>
									<td bgcolor="#FFFCCC"><xsl:value-of select="@titre" /></td>
									<td bgcolor="#FFFCCC"><b><font color="green"><xsl:value-of select="@version" /></font></b></td>
                                    <td bgcolor="orange"><b><a href='https://tools.cofrac.fr/documentation/{@link}'><xsl:value-of select="@link" /></a></b></td>
								</tr>
							</xsl:for-each>
							</table>
							</p>
					</xsl:for-each>
		</xsl:for-each>
	</body>
</html>