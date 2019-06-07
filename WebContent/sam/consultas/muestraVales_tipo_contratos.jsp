<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-bottom: 0px;
	color:#000;
	font-size:11px;
}
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
-->
</style>
<script>
	<!--Invoca el JQuery cap_contratos.js -->
	function cargar(id_vale,num_vale,clv_benefi, comprobado,por_comprobar){
		parent.regresaVale(id_vale,num_vale,clv_benefi, comprobado,por_comprobar);
	}

</script>
</head>
<body>  
<table width="95%" align="center">
  <tr>
    <td><h1>Listado de Vales de la Unidad
        <c:out value='${desMes}'/>
    </h1></td>
  </tr>
</table>
<table class="listas" border="0" align="center" cellpadding="0" cellspacing="0" width="95%">
  <tr bgcolor="#889FC9">
    <th width="18%" height="21" align="center">Num. Vale</th>
    <th width="51%" height="21" align="center">Concepto</th>
    <th width="14%" align="center">Fecha</th>
    <th width="17%" align="center">Por Comprobar</th>
  </tr>
   <c:set var="cont" value="${0}" />
  <c:forEach items="${listadovales}" var="item" varStatus="status" ><!--Viene de /sam/src/mx/gob/municipio/centro/view/controller/sam/utilerias-- ControladorMuestraValesContratos -->
    <c:set var="cont" value="${cont+1}" /> 
    <tr>
      <td width="18%" height="20" align="center"><a href="javascript:cargar('${item.CVE_VALE}','${item.NUM_VALE}','${item.CLV_BENEFI}','${item.COMPROBADO}', '${item.POR_COMPROBAR}')"><c:out value='${item.NUM_VALE}'/></a></td>
      <td width="51%" height="20" align="left"><c:out value='${item.JUSTIF}'/>
      </td>
      <td width="14%" height="20" align="center"><c:out value='${item.FECHA}'/></td>
      <td width="17%" height="20" align="right">$<fmt:formatNumber value='${item.POR_COMPROBAR}' pattern="###,###,###.00"/>&nbsp;</td>
    </tr>
  </c:forEach>
</table>
</body>
</html>