

<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Date"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Catalogo de Grupos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap2.css"></script>
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>

<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorUsuariosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../dwr/util.js"> </script>  

<script type="text/javascript" src="personas_usuarios.js?x=<%=System.currentTimeMillis()%>"></script>

<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>

<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
<form name="forma" method="get" action="" onSubmit=" return false" >

<input type="hidden" name="clave" id="clave" value="" />
<input type="hidden" name="idUsuario" id="idUsuario"  value=""/>
<input type="hidden" name="idTrabajador" id="idTrabajador"  value=""/>
<input name="accion" type="hidden"  id="accion" size="8" value="<c:out value='${accion}'/>" />

<div id="tabuladores">
	 <div class="panel with-nav-tabs panel-primary">
	 	 <div class="panel-heading">
	 	 	<ul class="nav nav-tabs responsive" id="tabsBeneficiariosPane" name="tabsBeneficiariosPane">
                <li class="active"><a href="#fragment-general" data-toggle="tab">Información general</a></li>
                <li><a href="#fragment-representante" data-toggle="tab">Datos Laborales</a></li>
                <li><a href="#fragment-fiscal" data-toggle="tab">Cuenta de usuario</a></li>
                <li><a href="#fragment-lstUsuarios">Lista de usuarios</a></li>
            </ul>
	 	 </div>
	 	 
	 	    <div class="panel-body">
	 	     	<div class="tab-content">
	 	     		 <!--Tab Información general-->
              		<div class="tab-pane fade in active" id="fragment-general">
              		 	<form class="form-horizontal">
              		 		 <!-- Encabezado -->
                    		 <div class="row">
                    		 	<div class="control-label col-sm-6"> Nota: (*) Requerido para nuevo beneficiario, (**) Requerido para nuevos funcionarios</div>
                    		 </div>
                    		 <br>
                    		<!-- Nombre -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Nombre :</div>
		                         <div class="col-sm-3 form-group">
		                         	<input name="nombre" class="form-control" type="text" id="nombre" onBlur="upperCase(this)" style="width:350px;">
		                         	<input type="hidden" name="idPersona" id="idPersona" value="<c:out value='${cve_pers}'/>">	
		                         </div>
		                      </div>
		                    </div>
		                    <!-- Apellido paterno -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Apellido Paterno:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input type="text" name="apaterno" id="apaterno"  class="form-control"   onBlur="upperCase(this)" style="width:350px" />
        							
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Apellido materno -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">*Apellido Materno:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input type="text" name="amaterno" id="amaterno" class="form-control"   style="width:350px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                     <!-- CURP -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">CURP:</div>
		                        <div class="col-sm-2 form-group">
		                        	<input type="text" name="curp" id="curp" class="form-control"    maxlength="18" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                     <!-- RFC -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">RFC:</div>
		                        <div class="col-sm-2 form-group">
		                        	<input type="text" name="rfc" id="rfc" class="form-control"   maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Fecha alta -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha alta:</div>
		                        <div class="col-sm-2 form-group">
		                        	<div class="input-group date">
			                              <input name="fecha_altab" type="text" class="form-control" id="fecha_alta"   maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>
		                   
              		 	</form>
              		</div>
	 	     		<div class="tab-pane" id="fragment-representante">
	 	     			<form class="form-horizontal">
	 	     					                                   
	 	     				<!-- Unidad administrativo  -->
	 	     				<div>
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3 ">*Unidades:</div>
			                        <div class="col-sm-3 form-group">
			                        	<select name="unidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="unidad" title="Seleccione una Unidad...">
									        <option value="">[Seleccione]</option>
										        <c:forEach items="${unidades}" var="item" varStatus="status">          
										        <option value='<c:out value="${item.ID}"/>'
										        <c:if test='${item.ID==persona.ID_DEPENDENCIA}'>selected</c:if>>
										        <c:out value="${item.DEPENDENCIA}"/>
									        </option>
									        </c:forEach>
									    </select>
			                        </div>
			                       
			                      </div>
			                    </div>
		                    </div>
		                    <div class="row">
		                    	<div class="form-group">
			                          <div class="control-label col-sm-3 ">*Profesión:</div>
			                          <div class="col-sm-3 form-group">
			                          	<select name="profesion" class="selectpicker form-control input-sm m-b" data-live-search="true" id="profesion" title="Seleccione una profesion..">
									        <option value="">[Seleccione]</option>
										        <c:forEach items="${profesiones}" var="item" varStatus="status">          
										        <option value='<c:out value="${item.PROFESION}"/>'
										        <c:if test='${item.PROFESION==persona.TRATAMIENTO}'>selected</c:if>>
										        <c:out value="${item.PROFESION}"/>
									        </option>
									        </c:forEach>
									    </select>
			                          </div>
			                    </div>
		                    </div>
		               </form>
	 	     		</div>
		 	    	<div class="tab-pane" id="fragment-fiscal">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Calle y numero -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Usuario:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="usuario" type="text" class="form-control" id="usuario" style="width:250px;"/>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Colonia -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Contraseña:</div>
		                        <div class="col-sm-2 form-group">
		                        	<input name="pass1" type="password" class="form-control" id="pass1" maxlength="20" style="width:250px;"/>
		                        </div>
		                        <div class="col-sm-2 form-group">
		                        	<input name="pass2" type="password" class="form-control" id="pass2" maxlength="20"  style="width:250px;"/>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Estatus -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Estatus:</div>
			                    <label class="switch">
									<input type="checkbox" name="estatus" id="estatus">
									<span class="slider round"></span>
								</label>
			                  </div>
		                    </div>
		                   
	 	     			</form>
		 	    	</div>
		 	    	<div class="tab-pane" id="fragment-lstUsuarios">
		 	    		
		 	    	</div>
	 	    	</div>
	 	    	<div class="row">
	 	    		<div class="control-label col-sm-3 "></div>
					<div class="col-sm-9 form-group">
						<input  name="btnlimpiar" type="button" class="btn btn-primary" id="btnlimpiar"   value="Nuevo" style="width:150px;" />
				      	<input  name="btnguardar" type="button" class="btn btn-success" id="btnguardar"   value="Guardar" style="width:150px" />
					</div>
				</div>
	 	    </div><!-- Cierre del Panel Body -->
	 </div><!-- panel with-nav-tabs panel-primary -->
	 
</div><!--Cierra Div tabuladores -->


</form>
</body>
</html>
